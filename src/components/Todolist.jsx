import React, {Component, createRef} from "react";
import Todo from './Todo'
import '../style/todo.css';
import "../Fonts/fontawesome-free-6.4.0-web/css/all.css"
import Swal from 'sweetalert2'
import react from "react";




export default class Todolist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            items: [],
            input: ''
        }

        this.inputfocus = react.createRef()
        this.setinputfocus = this.setinputfocus.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.todoTitleHandler = this.todoTitleHandler.bind(this)
        this.deleteall = this.deleteall.bind(this)
        this.delete = this.delete.bind(this)
    }
    
    componentDidMount(){
       this.setinputfocus()
      if(localStorage.getItem("localTasks")){
        this.setState(() => {
          return{
            items:  JSON.parse(localStorage.getItem("localTasks"))
          }
        })
      }
    }
    setinputfocus(){
      this.inputfocus.current.focus()
    }
    todoTitleHandler(event){
        this.setState({
            input: event.target.value
        })
    }

    addTodo(event){
      this.setinputfocus()
        event.preventDefault();
        if(this.state.input.trim() !== '')
        {
        let newobject = {
            id: this.state.items.length + 1,
            title: this.state.input,
            
        };
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Item added successfully'
          })
        this.setState(prevState => {
            return {
                items: [...prevState.items, newobject],
                input: ""
            }
        })
        localStorage.setItem("localTasks", JSON.stringify([...this.state.items, newobject]));
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'your input is empty!',
                
              })

              this.setState(() => {return{ input: ""}})
        }
    }


    delete(event){
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Item deleted'
                  })
                this.setState(() => {
                    return{
                        items: this.state.items.filter(f => f.id !== event)
                    }
              });
              const del = this.state.items.filter(f => f.id !== event)
              localStorage.setItem("localTasks", JSON.stringify(del));
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              Swal.fire(
                'Cancelled',
                '',
                'error'
              )
            }
          })
          
    }


    deleteall()
    {
        if(this.state.items.length === 0){
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'warning',
                title: 'there is nothing in your list'
              })
        }
        else{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                    this.setState(() => {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.addEventListener('mouseenter', Swal.stopTimer)
                              toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                          })
                          
                          Toast.fire({
                            icon: 'success',
                            title: 'Item deleted'
                          })
                        this.setState(() =>{
                            return {items: []}
                        }
                        )
                  });
                  localStorage.removeItem("localTasks");
                } else if (
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  Swal.fire(
                    'Cancelled',
                    '',
                    'error'
                  )
                }
              })
            
        }
        
       
    }

    render() {
        return (
            <>
                <div id="container">
                    <h1 className="title">Todo App</h1>
                    <form id="add-book" onSubmit={this.addTodo}>
                        <input ref={this.inputfocus} type="text" placeholder="Add your new todo" value={this.state.input} onChange={this.todoTitleHandler}/>
                        <button onClick={this.addTodo} type="submit" className="button">+</button>
                    </form>
                    <div id="book-list">
                        <ul>
                            {this.state.items.length === 0 && <h3 id="child"><i className="fa-solid fa-triangle-exclamation"></i> list is empty</h3>}
                            {this.state.items.map(item => {
                            return <Todo {...item} delete={this.delete}/>
                            })}
                        </ul>
                    </div>

                    <div className="info">
                        <div className="info-text">
                            <p className="info-text-item">You have </p><p className="info-text-item" id="number"> {this.state.items.length} </p><p className="info-text-item"> pending tasks</p>
                        </div>
                        <button onClick={this.deleteall} id="clear-all">Clear All</button>
                    </div>
                    
                </div>
            </>
        )
    }
}





