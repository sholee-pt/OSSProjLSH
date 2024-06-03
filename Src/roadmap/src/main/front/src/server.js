// const express = require('express');
// const cors = require('cors');
// const { spawn } = require('child_process');
// const path = require('path');
// const app = express();
// const port = 8080;

// // 프로젝트 루트 디렉토리의 절대 경로를 설정합니다.
// const projectRoot = path.resolve(__dirname, '../../../../Src');  // gradlew가 있는 디렉토리로 설정

// app.use(cors());
// app.use(express.json());

// app.get('/map', (req, res) => {
//     const { start, finish } = req.query;
//     if (!start || !finish) {
//         return res.status(400).json({ error: 'Invalid parameters' });
//     }

//     // Gradle Wrapper 경로 설정
//     const gradlewPath = path.join(projectRoot, 'gradlew');

//     // 빌드 명령어 (Gradle Wrapper 사용)
//     const gradlew = spawn(gradlewPath, ['build'], { cwd: projectRoot });

//     gradlew.stdout.on('data', (data) => {
//         console.log(`stdout: ${data}`);
//     });

//     gradlew.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//     });

//     gradlew.on('error', (error) => {
//         console.error(`gradlew error: ${error.message}`);
//         if (!res.headersSent) {
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//     });

//     gradlew.on('close', (code) => {
//         if (code !== 0) {
//             if (!res.headersSent) {
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }
//         }

//         // Gradle 빌드가 성공하면 자바 프로그램을 실행합니다.
//         const java = spawn('java', ['-cp', 'roadmap/build/classes/java/main', 'com.react.roadmap.function.DijkstraAlgorithm', start, finish], { cwd: projectRoot });

//         let javaOutput = '';

//         java.stdout.on('data', (data) => {
//             javaOutput += data;
//         });

//         java.stderr.on('data', (data) => {
//             console.error(`stderr: ${data}`);
//         });

//         java.on('error', (error) => {
//             console.error(`java error: ${error.message}`);
//             if (!res.headersSent) {
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }
//         });

//         java.on('close', (code) => {
//             if (code !== 0) {
//                 if (!res.headersSent) {
//                     return res.status(500).json({ error: 'Internal Server Error' });
//                 }
//             }

//             try {
//                 const route = JSON.parse(javaOutput);
//                 res.json({ dLatLng: route });
//             } catch (parseError) {
//                 console.error(`parse error: ${parseError}`);
//                 if (!res.headersSent) {
//                     return res.status(500).json({ error: 'Internal Server Error' });
//                 }
//             }
//         });
//     });
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

// const express = require('express');
// const cors = require('cors');
// const { spawn } = require('child_process');
// const path = require('path');
// const app = express();
// const port = 8080;

// // 프로젝트 루트 디렉토리의 절대 경로를 설정합니다.
// const projectRoot = path.resolve(__dirname, '../../../../../roadmap');  // gradlew가 있는 디렉토리로 설정
// const buildDir = path.join(projectRoot, 'build', 'classes', 'java', 'main');  // 빌드 결과물이 있는 디렉토리

// app.use(cors());
// app.use(express.json());

// app.get('/map', (req, res) => {
//     const { start, finish } = req.query;
//     if (!start || !finish) {
//         return res.status(400).json({ error: 'Invalid parameters' });
//     }

//     // Gradle Wrapper 경로 설정
//     const gradlewPath = path.join(projectRoot, 'gradlew');

//     // 빌드 명령어 (Gradle Wrapper 사용)
//     const gradlew = spawn(gradlewPath, ['build'], { cwd: projectRoot });

//     gradlew.stdout.on('data', (data) => {
//         console.log(`stdout: ${data}`);
//     });

//     gradlew.stderr.on('data', (data) => {
//         console.error(`stderr: ${data}`);
//     });

//     gradlew.on('error', (error) => {
//         console.error(`gradlew error: ${error.message}`);
//         if (!res.headersSent) {
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//     });

//     gradlew.on('close', (code) => {
//         if (code !== 0) {
//             if (!res.headersSent) {
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }
//         }

//         // Java 명령어 경로 설정
//         const javaPath = path.join('/Users/ddinga/.sdkman/candidates/java/current/bin', 'java');

//         // Gradle 빌드가 성공하면 자바 프로그램을 실행합니다.
//         const java = spawn(javaPath, ['-cp', buildDir, 'com.react.roadmap.function.DijkstraAlgorithm', start, finish], { cwd: projectRoot });

//         let javaOutput = '';

//         java.stdout.on('data', (data) => {
//             javaOutput += data;
//         });

//         java.stderr.on('data', (data) => {
//             console.error(`stderr: ${data}`);
//         });

//         java.on('error', (error) => {
//             console.error(`java error: ${error.message}`);
//             if (!res.headersSent) {
//                 return res.status(500).json({ error: 'Internal Server Error' });
//             }
//         });

//         java.on('close', (code) => {
//             if (code !== 0) {
//                 if (!res.headersSent) {
//                     return res.status(500).json({ error: 'Internal Server Error' });
//                 }
//             }

//             try {
//                 const route = JSON.parse(javaOutput);
//                 res.json({ dLatLng: route });
//             } catch (parseError) {
//                 console.error(`parse error: ${parseError}`);
//                 if (!res.headersSent) {
//                     return res.status(500).json({ error: 'Internal Server Error' });
//                 }
//             }
//         });
//     });
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });


const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const app = express();
const port = 8080;

// 프로젝트 루트 디렉토리의 절대 경로를 설정합니다.
const projectRoot = path.resolve(__dirname, '../../../../../roadmap');  // gradlew가 있는 디렉토리로 설정
const buildDir = path.join(projectRoot, 'build', 'classes', 'java', 'main');  // 빌드 결과물이 있는 디렉토리

app.use(cors());
app.use(express.json());

app.get('/map', (req, res) => {
  const { start, finish } = req.query;
  if (!start || !finish) {
    return res.status(400).json({ error: 'Invalid parameters' });
    }

    // Gradle Wrapper 경로 설정
    const gradlewPath = path.join(projectRoot, 'gradlew');

    // 빌드 명령어 (Gradle Wrapper 사용)
    const gradlew = spawn(gradlewPath, ['build', '--stacktrace'], { cwd: projectRoot });

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

        // Java 명령어 경로 설정
        const javaPath = path.join('/Users/ddinga/.sdkman/candidates/java/current/bin', 'java');

        // Gradle 빌드가 성공하면 자바 프로그램을 실행합니다.
        const java = spawn(javaPath, ['-cp', buildDir, 'com.react.roadmap.function.DijkstraAlgorithm', start, finish], { cwd: projectRoot });

        let javaOutput = '';

        java.stdout.on('data', (data) => {
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
                const route = JSON.parse(javaOutput);
                res.json({ dLatLng: route });
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
