import {instructions} from "./Instructions/instructions";
import {generateGuid} from "../../_helpers/utils";
import {comparisonOperators} from "./Instructions/operators";

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
                predicates: [
                    {
                        left: "odajj",
                        right: "",
                        operator: comparisonOperators.equal,
                        aggregator: null
                    }
                ]
            },
            children: [
                {
                    id: generateGuid(),
                    type: instructions.IfBlock,
                    droppable: true,
                    attributes: {
                        predicates: [
                            {
                                left: "adf",
                                right: "jkd",
                                operator: comparisonOperators.moreOrEqualThan,
                                aggregator: null
                            }
                        ]
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