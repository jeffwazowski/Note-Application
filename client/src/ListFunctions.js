import axios from 'axios'

export const getList = () => {
    return axios
        .get('api/tasks', {
            headers: { 'Content-type': 'application/json' }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach(function (key) {
                var val = res.data[key]
                data.push([val.title, val._id,val.date,val.content])
            })

            return data
        })
}

export const addToList = (term,content) => {
    return axios
        .post(
            'api/task',
            {
                title: term,
                content: content
            },
            {
                headers: { 'Content-type': 'application/json' }
            }
        )
        .then((response) => {
            console.log(response)
        })
}

export const deleteItem = term => {
    axios
        .delete(`api/task/${term}`, {
            headers: { 'Content-type': 'application/json' }
        })
        .then((response) => {
            console.log(response)
        })
        .catch((response) => {
            console.log(response)
        })
}

export const updateItem = (term, id, content) => {
    return axios
        .put(`api/task/${id}`, {
            title: term,
            content: content
        }, {
                headers: { 'Content-type': 'application/json' }
            }
        )
        .then((response) => {
            console.log(response)
        })
}