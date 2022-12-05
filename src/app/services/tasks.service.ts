import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Task } from '../models/task';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasksU: string[] = [];
  private tasksC: string[] = [];

  constructor(private fs: AngularFirestore) { 
    this.tasksU.push("Tarea 1");
    this.tasksU.push("Tarea 2");
    const t1 = {txt: 'jola', completed: false}
  }
  public getTasks() {
    /* return this.tasksU; */
    return this.fs.collection('tareas',ref => ref.where('completed', '==', false)).snapshotChanges();
  }

  public getCompleted() {
    /* return this.tasksC; */
    return this.fs.collection('tareas',ref => ref.where('completed', '==', true)).snapshotChanges();
  }

  public addTask(task:Task) {
    this.fs.collection('tareas').add(task)
  }

  public removeTask(id:string){
    this.fs.collection('tareas').doc(id).delete()
  }

  public completeTask(id:string){
    this.fs.collection('tareas').doc(id).update({completed:true})
  }

  public uncompleteTask(id:string){
    this.fs.collection('tareas').doc(id).update({completed:false})
  }
}
