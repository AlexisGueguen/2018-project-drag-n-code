import {instructions} from "./Instructions/instructions";
import {generateGuid} from "../../_helpers/utils";

export const initialState = {
    tree: [
        {
            id: 'code-root',
            type: instructions.Root,
            droppable: true,
            attributes: {
                title: 'Main'
            },
            children: [
                {
                    id: generateGuid(),
                    type: instructions.VariableDeclaration,
                    droppable: false,
                    attributes: {
                        title: 'Variable'
                    },
                    children: []
                },
                {
                    id: generateGuid(),
                    type: instructions.VariableDeclaration,
                    droppable: false,
                    attributes: {
                        title: 'Variable'
                    },
                    children: []
                }
            ]
        },
        {
            id: generateGuid(),
            type: instructions.VariableDeclaration,
            droppable: false,
            attributes: {
                title: 'Variable'
            },
            children: []
        },
        {
            id: generateGuid(),
            type: instructions.IfBlock,
            droppable: true,
            attributes: {
                title: 'IF'
            },
            children: [
                {
                    id: generateGuid(),
                    type: instructions.IfBlock,
                    droppable: true,
                    attributes: {
                        title: 'IF'
                    },
                    children: [
                        {
                            id: generateGuid(),
                            type: instructions.VariableDeclaration,
                            droppable: false,
                            attributes: {
                                title: 'Variable'
                            },
                            children: []
                        }
                    ]
                }
            ]
        }
    ]
};