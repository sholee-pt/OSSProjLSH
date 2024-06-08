const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const app = express();
const port = 8080;

// 프로젝트 루트 디렉토리의 절대 경로를 설정합니다.
const projectRoot = path.resolve(__dirname, '../../../../../roadmap');  // gradlew가 있는 디렉토리로 설정
const buildDir = path.join(projectRoot, 'build', 'libs');  // 빌드 결과물이 있는 디렉토리

app.use(cors());
app.use(express.json());

const locDataPath = path.join(__dirname, './components/node.json');
const locData = JSON.parse(fs.readFileSync(locDataPath, 'utf-8'));

app.get('/map', (req, res) => {
    const { start, finish } = req.query;
    if (!start || !finish) {
        return res.status(400).json({ error: 'Invalid parameters' });
    }

    // Gradle Wrapper 경로 설정
    const gradlewPath = path.join(projectRoot, 'gradlew');

    // 빌드 명령어 (Gradle Wrapper 사용)
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

        // 사용자 홈 디렉토리 경로 가져오기
        const homeDir = os.homedir();
        const javaPath = path.join(homeDir, '.sdkman/candidates/java/current/bin', 'java');

        // Fat JAR 파일 경로 설정
        const jarPath = path.join(buildDir, 'app.jar');

        // Java 프로그램을 Fat JAR로 실행
        const java = spawn(javaPath, ['-jar', jarPath, start, finish], { cwd: projectRoot });

        let javaOutput = '';

        java.stdout.on('data', (data) => {
            console.log(`java stdout: ${data}`);
            javaOutput += data;
        });

        java.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
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
                console.log("javaOutput:", javaOutput); // 디버깅을 위해 javaOutput을 출력합니다.
                const shortestPath = JSON.parse(javaOutput.trim());
                //좌표 데이터(dLatLng)를 추가하여 반환
                const dLatLng = shortestPath.map(node => {
                    const loc = locData.find(loc => loc.code === node);
                    return loc ? [loc.latitude, loc.longitude] : [0, 0];
                });
                console.log("dLatLng:", dLatLng, "shortestPath:", shortestPath); // 디버깅을 위해 출력합니다.
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
