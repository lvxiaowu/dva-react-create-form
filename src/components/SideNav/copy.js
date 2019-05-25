import React, {
	Component
} from 'react';
import {  DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { basicComponents, advanceComponents, layoutComponents } from './conponentConfig';
import './style/side-nav.less';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;



class SideNav extends Component {
    state = {
      
    };

    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
		// console.log(result)
		return
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };
	onDragStart = (result)=>{
		console.log('start',result)
		return
	}
	onUpdate = (result)=>{
		console.log('undate',result)
		return
	}
	
    render() {
        return (
			<div>
				<div className="components-list">
				 <div className="widget-cate">基础字段</div>
				 <DragDropContext onDragEnd={this.onDragEnd} onUpdate={this.onUpdate} onDragStart={this.onDragStart}>
				 <ul>
					 <Droppable droppableId="droppable">
							{(provided, snapshot) => (
								<div
									ref={provided.innerRef}
									>
									{basicComponents.map((item, index) => (
										<Draggable
											key={item.name}
											draggableId={item.type}
											index={index}>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<li className="form-edit-widget-label">
														<a>
															<i></i>
															<span>{item.name}</span>
														</a>
													</li>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
							</Droppable>
							</ul>
				 </DragDropContext>
				</div>
			</div>
        );
    }
}
export default SideNav;
