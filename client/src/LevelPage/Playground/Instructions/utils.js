import {instructions} from "./instructions";
import {VariableDeclaration} from "./VariableDeclaration";
import {IfBlock} from "./IfBlock";
import {ForLoop} from "./ForLoop";
import {PrintInstruction} from "./Print";

export function createIntsructionFromType(type) {
    switch (type) {
        case instructions.VariableDeclaration:
            return VariableDeclaration.createInstruction();
        case instructions.IfBlock:
            return IfBlock.createInstruction();
        case instructions.ForLoop:
            return ForLoop.createInstruction();
        case instructions.Print:
            return PrintInstruction.createInstruction();
        default:
            throw new Error(`Unkown instruction type ${type}`);
    }
}