
import {
    init,
    compileCPP,
    compileCPPWithInput,
    compileJava,
    compileJavaWithInput,
    compilePython,
    compilePythonWithInput,
    fullStat
} from "compilex";
export const sample_question = async (req, res) => {
    const questionData = {
        question:
            "Write a function that takes an array of integers and returns the sum of all even numbers in the array.",
        testCases: [
            "Input: [1, 2, 3, 4, 5] - Output: 6",
            "Input: [2, 4, 6, 8, 10] - Output: 30",
            "Input: [1, 3, 5, 7] - Output: 0",
        ],
    };
    res.json(questionData);
}

export const compilethecode = (req, res) => {
    const { code, lang, input } = req.body;

    let envData = { OS: "windows" };

    console.log("Received code: ${ code }");
    console.log("Language: ${ lang }");
    console.log("Input: ${ input }");

    const callback = (data) => {
        console.log(`Compiler response: ${JSON.stringify(data)}`);
        res.send(data.error ? { error: data.error } : { output: data.output });
    };
    if (lang === "Python") {
        if (input) {
            compilePythonWithInput(envData, code, input, callback);
        } else {
            compilePython(envData, code, callback);
        }
    }
}

export const fullstat_controller = (req, res) => {
    fullStat((data) => {
        res.send(data);
    });
}