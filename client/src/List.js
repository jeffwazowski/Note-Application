import React, { Component } from 'react'
import { getList, addToList, deleteItem, updateItem } from './ListFunctions'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class List extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            term: '',
            date:'',
            content:'',
            editDisabled: false,
            updateDisabled: true,
            items: []
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onChangedate = this.onChangedate.bind(this)
        this.onChangecontent = this.onChangecontent.bind(this)
    }

    submit = (val, e) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
            {
                label: 'Yes'
            },
            {
                label: 'No'
            }
        ]
        });
    };

    componentDidMount () {
        this.getAll()
    }

    onChange = event => {
        this.setState({
            term: event.target.value,
            editDisabled: 'disabled'
        })
    }

    onChangedate = event => {
        this.setState({
            date: event.target.value,
            editDisabled: 'disabled'
        })
    }

    onChangecontent = event => {
        this.setState({
            content: event.target.value,
            editDisabled: 'disabled'
        })
    }

    getAll = () => {
        getList().then(data => {
            this.setState(
                {
                    term: '',
                    date: '',
                    content: '',
                    items: [...data]
                },
                () => {
                    console.log(this.state.term)
                    console.log(this.state.date)
                    console.log(this.state.content)
                }
            )
        })
    }

    onSubmit = e => {
        e.preventDefault()
        this.setState({ editDisabled: '', updateDisabled: 'disabled' })
        addToList(this.state.term, this.state.content).then(() => {
            this.getAll()
        })
    }

    onUpdate = e => {
        e.preventDefault()
        this.setState({ editDisabled: '', updateDisabled: 'disabled'})
        updateItem(this.state.term, this.state.id, this.state.content).then(() => {
            this.getAll()
        })
    }

    onEdit = (item, itemid, item_date, item_content, e) => {
        e.preventDefault()
        this.setState({
            id: itemid,
            term: item,
            date: item_date,
            content: item_content,
            updateDisabled: ''
        })
        console.log(itemid)
    }

    onDelete = (val, e) => {
        e.preventDefault()
        deleteItem(val)

        var data = [...this.state.items]
        data.filter((item, index) => {
            if (item[1] === val) {
                data.splice(index, 1)
            }
            return true
        })
        this.setState({ items: [...data], updateDisabled: 'disabled' })
    }

    render () {
        return (
            <div className="col-md-12">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="column">
                        <label htmlFor="input1">Title Note</label>
                            <div className="col-md-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="input1"
                                    value={this.state.term || ''}
                                    onChange={this.onChange.bind(this)}
                                />
                            </div>
                        <label htmlFor="input2">Date Note</label>
                            <div className="col-md-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="input2"
                                    value={this.state.date || ''}
                                    onChange={this.onChangedate.bind(this)}
                                disabled/>
                            </div>
                            <label htmlFor="input3">Note Content</label>
                            <div className="col-md-12">
                                <textarea className="col-md-12" name="comment" id="input3" value={this.state.content || ''} onChange={this.onChangecontent.bind(this)}>Enter text here...</textarea>
                            </div>
                        </div>
                    </div>
                                <button
                                    className="btn btn-primary btn-block"
                                    disabled={this.state.updateDisabled}
                                    onClick={this.onUpdate.bind(this)}>
                                    Update
                                </button>
                    <button
                        type="submit"
                        onClick={this.onSubmit.bind(this)}
                        className="btn btn-success btn-block">
                        Submit
                    </button>
                </form><br/>
                <table className="table">
                    <thead>
                            <tr>
                                <td className="text-left"><h3>Title </h3></td>
                                <td className="text-left"><h3>Date </h3></td>
                                <td className="text-left"><h3>Content </h3></td>
                                <td className="text-center"><h3>Option</h3>
                                </td>
                            </tr>
                    </thead>
                    <tbody>
                        {this.state.items.map((item, index) => (
                            <tr key={index}>
                                <td className="text-left">{item[0]}</td>
                                <td className="text-left">{item[2]}</td>
                                <td className="text-left">{item[3]}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-info mr-1"
                                        disabled={this.state.editDisabled}
                                        onClick={this.onEdit.bind(this, item[0], item[1], item[2], item[3])}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        disabled={this.state.editDisabled}
                                        //onClick={() => { if (window.confirm('Delete the item?')) this.onDelete.bind(item[1])}}
                                        //onClick={() => {if(window.confirm('Delete the item?')){this.onDelete.bind(this, item[1])}}}
                                        onClick={this.onDelete.bind(this, item[1])}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List