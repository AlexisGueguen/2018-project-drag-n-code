import {codeConstants} from "../_constants";
import {instructions} from "../LevelPage/Instructions/instructions";
import {VariableDeclaration} from "../LevelPage/Instructions";

export const codeActions = {
    init,
    addInstruction,
    removeInstruction,
    moveInstruction
};

function init() {
    return {type: codeConstants.INIT_CODE}
}

function addInstruction(code, source, destination, type) {
    const instr = createInstructionFromId(type);
    code.splice(destination.index, 0, instr);
    return { type: codeConstants.ADD_INSTRUCTION, code }
}

function removeInstruction(code, id) {
    const index = code.indexOf(x=>x.id === id);
    code.splice(index, 1);
    return { type: codeConstants.REMOVE_INSTRUCTION, code };
}

function moveInstruction(code, source, destination, instructionId) {
    //const newCode = Array.from(this.state.code);
    const instruction = code[source.index];
    code.splice(source.index, 1);
    code.splice(destination.index, 0, instruction);
    return { type: codeConstants.MOVE_INSTRUCTION, code };
}

function createInstructionFromId(id) {
    let instruction;
    switch (id) {
        case instructions.VariableDeclaration:
            instruction = VariableDeclaration.createInstruction();
            break;
        default:
            throw new Error("Instruction with the id {id} is unrecognized by the system.");
    }
    return instruction;
}

