import {instructions} from "./instructions";
import {VariableDeclaration} from "./VariableDeclaration";
import {IfBlock} from "./IfBlock";

export function createIntsructionFromType(type) {
    switch (type) {
        case instructions.VariableDeclaration:
            return VariableDeclaration.createInstruction();
        case instructions.IfBlock:
            return IfBlock.createInstruction();
        default:
            throw new Error(`Unkown instruction type ${type}`);
    }
}