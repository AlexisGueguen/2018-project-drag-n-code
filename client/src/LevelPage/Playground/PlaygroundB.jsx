import React, {Component} from 'react';
import styled from 'styled-components';
import Tree, {
    mutateTree,
    moveItemOnTree,
    type RenderItemParams,
    type TreeItem,
    type TreeData,
    type ItemId,
    type TreeSourcePosition,
    type TreeDestinationPosition,
} from '@atlaskit/tree';
import {initialTree} from './Tree/initialTree.js';
import {Col} from "react-bootstrap";

const PreTextIcon = styled.span`
  display: inline-block;
  width: 16px;
  justify-content: center;
  cursor: pointer;
`;

type State = {|
    tree: TreeData,
|};

const getIcon = (
    item: TreeItem,
    onExpand: (itemId: ItemId) => void,
    onCollapse: (itemId: ItemId) => void,
) => {
    if (item.children && item.children.length > 0) {
        return item.isExpanded ? (
            <PreTextIcon onClick={() => onCollapse(item.id)}>-</PreTextIcon>
        ) : (
            <PreTextIcon onClick={() => onExpand(item.id)}>+</PreTextIcon>
        );
    }
    return <PreTextIcon>&bull;</PreTextIcon>;
};

export default class DragDropWithNestingTree extends Component<void, State> {
    state = {
        tree: initialTree,
    };

    renderItem = ({item, onExpand, onCollapse, provided}: RenderItemParams) => {
        let htmlItem;
        switch(item.data.type) {
            case 'instructions':
                htmlItem = <div className="instruction-if-placed" onClick={() => {}}>
                    {getIcon(item, onExpand, onCollapse)}
                    {item.data ? item.data.title : ''}
                </div>;
                break;
            case 'ifblock':
                htmlItem = <div className="instruction-if-placed">
                    {getIcon(item, onExpand, onCollapse)}
                    {item.data ? item.data.title : ''}
                </div>;
                break;
            case 'separator':
                htmlItem = <div className="instruction-separator">
                    {item.data ? item.data.title : ''}
                </div>;
                break;
            default:
                htmlItem = <span>
                    {getIcon(item, onExpand, onCollapse)}
                    {item.data ? item.data.title : ''}
                </span>;
                break;
        }
        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                {htmlItem}
            </div>
        );
    };

    onExpand = (itemId: ItemId) => {
        const {tree}: State = this.state;
        this.setState({
            tree: mutateTree(tree, itemId, {isExpanded: true}),
        });
    };

    onCollapse = (itemId: ItemId) => {
        const {tree}: State = this.state;
        this.setState({
            tree: mutateTree(tree, itemId, {isExpanded: false}),
        });
    };

    onDragEnd = (
        source: TreeSourcePosition,
        destination: ?TreeDestinationPosition,
    ) => {
        const {tree} = this.state;

        console.log('Source:');
        console.log(source);
        console.log('Destination:');
        console.log(destination);

        if (!destination) {
            return;
        }

        const newTree = moveItemOnTree(tree, source, destination);
        this.setState({
            tree: newTree,
        });
    };

    render() {
        const {tree} = this.state;

        return (
            <Col sm={7} md={7} className="playground">
                <Tree
                    tree={tree}
                    renderItem={this.renderItem}
                    onExpand={this.onExpand}
                    onCollapse={this.onCollapse}
                    onDragEnd={this.onDragEnd}
                    offsetPerLevel={16}
                    isDragEnabled
                    isNestingEnabled
                />
            </Col>
        );
    }
}