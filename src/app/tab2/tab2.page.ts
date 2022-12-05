import { TasksService } from '../services/tasks.service';
import { Component } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public tasks: Task[];
  
  constructor(private taskService:TasksService) {
    this.taskService.getCompleted().subscribe(data =>{
      this.tasks = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Task)
        }
        
      })
    })
   }

   public uncompleteTask(id: string){
    this.taskService.uncompleteTask(id);
   }

}
