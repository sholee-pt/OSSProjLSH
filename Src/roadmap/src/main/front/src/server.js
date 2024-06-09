
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');
const app = express();
const port = 8080;

const projectRoot = path.resolve(__dirname, '../../../../../roadmap');
const buildDir = path.join(projectRoot, 'build', 'libs');

app.use(cors());
app.use(express.json());

app.get('/map', (req, res) => {
    const { start, finish, mode } = req.query;
    if (!start || !finish || !mode) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }

    let locDataPath;
    let javaClass;
    let latLngClass;
    let jarFileName;

    if (mode === 'wheelchair') {
        locDataPath = path.join(__dirname, './components/node_W.json');
        javaClass = 'DijkstraAlgorithm_W';
        latLngClass = 'GetLatLng_W';
        jarFileName = 'app_wheelchair.jar'; // 휠체어 모드용 JAR 파일 이름
    } else {
        locDataPath = path.join(__dirname, './components/node.json');
        javaClass = 'DijkstraAlgorithm';
        latLngClass = 'GetLatLng';
        jarFileName = 'app.jar'; // 걷기 모드용 JAR 파일 이름
    }

    const locData = JSON.parse(fs.readFileSync(locDataPath, 'utf-8'));
    const gradlewPath = path.join(projectRoot, 'gradlew');
    const gradlew = spawn(gradlewPath, ['bootJar', '--stacktrace'], { cwd: projectRoot });

    gradlew.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    gradlew.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    gradlew.on('error', (error) => {
        console.error(`gradlew error: ${error.message}`);
        if (!res.headersSent) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    gradlew.on('close', (code) => {
        if (code !== 0) {
            if (!res.headersSent) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }

        const homeDir = os.homedir();
        const javaPath = path.join(homeDir, '.sdkman/candidates/java/current/bin', 'java');
        const jarPath = path.join(buildDir, jarFileName);

        console.log(`javaPath: ${javaPath}`);
        console.log(`jarPath: ${jarPath}`);

        const java = spawn(javaPath, ['-jar', jarPath, start, finish, javaClass, latLngClass], { cwd: projectRoot });

        let javaOutput = '';

        java.stdout.on('data', (data) => {
            console.log(`java stdout: ${data}`);
            javaOutput += data;
        });

        java.stderr.on('data', (data) => {
            console.error(`java stderr: ${data}`);
        });

        java.on('error', (error) => {
            console.error(`java error: ${error.message}`);
            if (!res.headersSent) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        java.on('close', (code) => {
            if (code !== 0) {
                if (!res.headersSent) {
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
            }

            try {
                console.log("javaOutput:", javaOutput); 
                const shortestPath = JSON.parse(javaOutput.trim());
                const dLatLng = shortestPath.map(node => {
                    const loc = locData.find(loc => loc.code === node);
                    return loc ? [loc.latitude, loc.longitude] : [0, 0];
                });
                console.log("dLatLng:", dLatLng, "shortestPath:", shortestPath); 
                res.json({ dLatLng, shortestPath });
            } catch (parseError) {
                console.error(`parse error: ${parseError}`);
                if (!res.headersSent) {
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

