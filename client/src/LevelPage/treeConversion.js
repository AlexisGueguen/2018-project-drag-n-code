import {instructions} from "./Playground/Instructions/instructions";

export const conversion = {
    toCPP
};

function toCPP(tree) {
    let code = '#include <iostream>\nusing namespace std;\n\nint main()\n{\n';
    let indentation = 1;
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
                return `${predicate.aggregator ? ' ' + predicate.aggregator + ' ' : ''} ${predicate.left} ${predicate.operator} ${predicate.right}`;
            }));
            let children = '';
            instruction.children.forEach(child => children += instructionToCPP(child, indentation + 1));
            code += createIndent(indentation) + `if (${predicates}){\n${children}${createIndent(indentation)}}\n`;
            break;
        }
        case instructions.ForLoop: {
            let initialization = `${attr.initialization.type} ${attr.initialization.name}=${attr.initialization.value}`;
            let conditions = `${attr.condition.left} ${attr.condition.operator} ${attr.condition.right}`;
            let increment = `${attr.increment.variable}${attr.increment.operator}${attr.increment.value}`;
            let children = '';
            instruction.children.forEach(child => children += instructionToCPP(child, indentation+1));
            code += createIndent(indentation) + `for (${initialization} ; ${conditions} ; ${increment}) {\n${children}${createIndent(indentation)}}\n`;
            break;
        }
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