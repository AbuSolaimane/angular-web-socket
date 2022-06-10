import {Component, OnInit} from '@angular/core';
import {StompService} from "./services/stomp.service";
import {HttpClient} from "@angular/common/http";

export interface Message {
  type: string,
  message: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  content = '';
  received: Message[] = [];
  sent: Message[] = [];

  constructor(private stompService: StompService, private httpClient: HttpClient) {}

  sendMsg() {
    this.httpClient.post<Message>('http://localhost:8080/kafka/readDataFromWebUi',
      { type: "info", message: this.content }).subscribe();
  }

  ngOnInit(): void {
    this.stompService.subscribe("/topic/message", (data: Message) => console.log(data));
  }
}
