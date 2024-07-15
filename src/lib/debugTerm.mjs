import { spawn } from 'child_process';
import fs from 'fs';
import readline from 'readline';
import chalk from 'chalk';

// Function to display the log file content with line numbers
function displayLogFile(filePath) {
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        terminal: false
    });

    let lineNumber = 0;

    rl.on('line', (line) => {
        lineNumber++;
        const lineNumberStr = chalk.cyanBright(`${lineNumber}`.padStart(3, ' '));
        const arrow = chalk.greenBright('=>');
        const timestamp = chalk.yellow(line.substring(0, 19));
        const level = line.includes('ERROR') ? chalk.redBright('ERROR') : chalk.blueBright('INFO');
        const message = chalk.white(line.substring(24));

        console.log(`${lineNumberStr} ${arrow} ${timestamp} [${level}] ${message}`);
    });

    rl.on('close', () => {
        console.log(chalk.greenBright('End of log file.'));
    });
}

// Function to start a terminal process
function startTerminalProcess() {
    const shell = process.platform === 'win32' ? 'cmd.exe' : 'bash';
    const terminal = spawn(shell, [], { stdio: 'inherit' });

    terminal.on('close', (code) => {
        console.log(chalk.redBright(`Terminal process exited with code ${code}`));
    });
}

// File path to the log file
const logFilePath = 'logfile.log';

// Display the log file content with line numbers
displayLogFile(logFilePath);

// Start a terminal process
startTerminalProcess();