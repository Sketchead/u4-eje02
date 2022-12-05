import { TasksService } from './../services/tasks.service';
import { Component } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public tasks: Task[];
  public task: Task;
  
  constructor(private taskService:TasksService) {
    this.taskService.getTasks().subscribe(data =>{
      this.tasks = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Task)
        }
      })
    })
    this.task = {
      completed: false,
      txt: 'algo'
    };
   }
 
   public addTask() {
    this.taskService.addTask(this.task);
    this.task.txt=""; 
   }
 
   public removeTask(id:string) {
    this.taskService.removeTask(id);
   }

   public completeTask(id: string){
    this.taskService.completeTask(id);
   }
}
