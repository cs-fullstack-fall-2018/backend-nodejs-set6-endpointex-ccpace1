import React, {Component} from 'react'

class ToDoList extends Component {


    render() {
        var forEachItem = this.props.arr.map(
            eachItem => {
                if(eachItem.isDone === true){
                    (eachItem.isDone) = ("Complete");
                }

                return (

                    <div>

                        <p>{eachItem.username}</p>
                        <p>{eachItem.todo}</p>
                        <p>{eachItem.isDone}</p>
                        <button onClick={()=> this.props.(eachItem._id)}>Delete</button>
                        <button onClick={()=> this.props.deleteFunction(eachItem._id)}>Delete</button>
                        <hr/>
                    </div>

                )
            }
        );

        return (
            <div>
                <h2> {forEachItem}</h2>
            </div>
        );
    }
}

export default ToDoList;