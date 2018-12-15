import {instructions} from "./Playground/Instructions/instructions";
import {assignmentOperators} from "./Playground/Instructions/operators";
import {printType} from "./Playground/Instructions/Print";

export const conversion = {
    toCPP
};

function toCPP(tree) {
    let indentation = 1;
    const includes = '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\n';
    let inputsTreatment = createIndent(indentation) + 'vector<int> inputs;\n';
    inputsTreatment += createIndent(indentation) + 'for (string line; getline(cin, line);) {\n';
    inputsTreatment += createIndent(indentation + 1) + 'inputs.push_back(stoi(line));\n';
    inputsTreatment += createIndent(indentation) + '}\n';
    let code = `${includes}int main() { \n${inputsTreatment}`;
    tree.forEach((item) => {
        code += instructionToCPP(item, indentation);
    });
    code += createIndent(indentation) + 'return 0;\n}';
    return code;
}

function instructionToCPP(instruction, indentation) {
    let code = '';
    const {attributes: attr} = instruction;
    switch (instruction.type) {
        case instructions.VariableDeclaration: {
            code += createIndent(indentation) + `${attr.type} ${attr.name}${attr.value ? ` = ${attr.value}` : ''};\n`;
            break;
        }
        case instructions.IfBlock: {
            const predicates = attr.predicates.map((predicate => {
                return `${predicate.aggregator ? ' ' + predicate.aggregator + ' ' : ''}${predicate.left}${predicate.operator}${predicate.right}`;
            }));
            let children = '';
            instruction.children.forEach(child => children += instructionToCPP(child, indentation + 1));
            code += createIndent(indentation) + `if (${predicates}){\n${children}${createIndent(indentation)}}\n`;
            break;
        }
        case instructions.ForLoop: {
            let initialization = `${attr.initialization.type} ${attr.initialization.name}=${attr.initialization.value}`;
            let conditions = `${attr.condition.left} ${attr.condition.operator} ${attr.condition.right}`;
            let incrementValue: string;
            if (attr.increment.operator === assignmentOperators.plusPlus
                || attr.increment.operator === assignmentOperators.minusMinus
            ) {
                incrementValue = '';
            } else {
                incrementValue = attr.increment.value;
            }
            let increment = `${attr.increment.variable}${attr.increment.operator}${incrementValue}`;
            let children = '';
            instruction.children.forEach(child => children += instructionToCPP(child, indentation + 1));
            code += createIndent(indentation) + `for (${initialization} ; ${conditions} ; ${increment}) {\n${children}${createIndent(indentation)}}\n`;
            break;
        }
        case instructions.Print: {
            let content;
            if (attr.type === printType.text) {
                content = `"${attr.value}"`;
            } else if (attr.type === printType.variable) {
                content = attr.value;
            } else {
                break;
            }
            code += createIndent(indentation) + `cout << ${content} << endl;\n`;
            break;
        }
        case instructions.VariableOperation: {
            let expression: string;
            if (attr.assignmentOperator === assignmentOperators.plusPlus
                || attr.assignmentOperator === assignmentOperators.minusMinus
            ) {
                expression = '';
            } else {
                expression = attr.left;
                if (attr.operator !== '') {
                    expression += attr.operator + attr.right;
                }
            }
            code += createIndent(indentation) + `${attr.variable}${attr.assignmentOperator}${expression};\n`;
            break;
        }
        default:
            break;
    }
    return code;
}

function createIndent(indentation) {
    let result = '';
    for (let i = 0; i < indentation; i++) {
        result += '  ';
    }
    return result;
}