import {instructions} from "./Instructions/instructions";
import {generateGuid} from "../../_helpers/utils";

export const initialState = {
    tree: [
        {
            id: generateGuid(),
            type: instructions.VariableDeclaration,
            droppable: false,
            attributes: {
                type: "var",
                name: "a",
                value: ""
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
                                type: "var",
                                name: "b",
                                value: ""
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
                        type: "var",
                        name: "c",
                        value: ""
                    },
                    children: []
                }
            ]
        }
    ]
};