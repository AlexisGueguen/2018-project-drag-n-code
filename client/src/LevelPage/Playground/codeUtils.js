import _ from "lodash";
import {instructions} from "./Instructions/instructions";
import {IfBlock} from './Instructions';
import {VariableDeclaration} from "./Instructions";
import {codeConstants} from "../../_constants";

export const codeUtils = {
    addInstruction,
    removeInstruction,
    moveInstruction,
    updateInstruction,
    combineInstructions
};

function addInstruction(code, source, destination, type) {
    executeActionInSubTree(code, destination.droppableId, (subTree, i) => {
        const instr = createInstructionFromId(type);
        subTree[i].children.splice(destination.index, 0, instr);
        return subTree[i].children[destination.index];
    });
    return {type: codeConstants.ADD_INSTRUCTION, code};
}

function removeInstruction(code, id) {
    executeActionInSubTree(code, id, (subTree, i) => {
        let instr = subTree[i];
        subTree.splice(i, 1);
        return instr;
    });
    return {type: codeConstants.REMOVE_INSTRUCTION, code};
}

function moveInstruction(code, source, destination, instructionId) {
    //STEP 1: Get the instruction and remove it from the code
    let instr = executeActionInSubTree(code, instructionId, (subTree, i) => {
        let instrCopy = _.clone(subTree[i]);
        subTree.splice(i, 1);
        return instrCopy;
    });

    // STEP 2: Find destination and insert the instruction
    executeActionInSubTree(code, destination.droppableId, (subTree, i) => {
        if (!subTree[i].children) subTree[i].children = [];
        subTree[i].children.splice(destination.index, 0, instr);
        return subTree[i].children[subTree[i].children.length - 1];
    });

    return {type: codeConstants.MOVE_INSTRUCTION, code};
}

function updateInstruction(code, instr) {
    executeActionInSubTree(code, instr.id, (subTree, i) => {
        subTree[i].attributes = instr.attributes;
        return subTree[i];
    });
    return {type: codeConstants.UPDATE_INSTRUCTION, code};
}

function combineInstructions(code, dropSource, sourceId, destinationId) {

    //STEP 1: Find source instruction and remove it from code (return a copy)
    let instr = executeActionInSubTree(code, sourceId, (subTree, i) => {
        let instrCopy = _.clone(subTree[i]);
        subTree.splice(i, 1);
        return instrCopy;
    });

    //STEP 2: Find destination instruction and add source instruction to its children
    executeActionInSubTree(code, destinationId, (subTree, i) => {
        if (!subTree[i].children) subTree[i].children = [];
        subTree[i].children.push(instr);
        return subTree[i].children[subTree[i].children.length - 1];
    });

    return {type: codeConstants.COMBINE_INSTRUCTION, code};
}

function executeActionInSubTree(subTree, id, action) {
    for (let i = 0 ; i < subTree.length ; i++) {
        if (subTree[i].id === id) {
            return action(subTree, i);
        }
        for (let k = 0 ; subTree[i].children && k < subTree[i].children.length ; k++) {
            let result = executeActionInSubTree(subTree[i].children, id, action);
            if (result) return result;
        }
    }
    return null;
}

function createInstructionFromId(id) {
    let instruction;
    switch (id) {
        case instructions.IfBlock:
            instruction = IfBlock.createInstruction();
            break;
        case instructions.VariableDeclaration:
            instruction = VariableDeclaration.createInstruction();
            break;
        default:
            throw new Error("Instruction with the id {id} is unrecognized by the system.");
    }
    return instruction;
}