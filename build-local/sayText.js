import { execSync } from "child_process";
export function sayText(repo, what) {
    what = what.replace(/'/g, "\\'");
    try {
        const command = `cd ~/D/dev/ai/kokoro && env/bin/python3 offline-transcription/cli.py '${what}' -s 1 -v af_bella`;
        const output = execSync(command, { encoding: 'utf8' });
        // Extract the filename from the output
        const match = output.match(/Audio output saved to ([^\n]+)\.wav/);
        if (match && match[1]) {
            return `${match[1]}.wav`;
        }
        // If can't extract filename, log warning and return default filename
        console.warn('Could not extract filename from command output');
        return `unknown-${Date.now()}.wav`;
    }
    catch (error) {
        console.error('Error executing speech synthesis:', error);
        return `error-${Date.now()}.wav`;
    }
}
//# sourceMappingURL=sayText.js.map