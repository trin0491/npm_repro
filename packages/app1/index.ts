import is_number from 'is-number';
import {A_NUMBER} from "lib1";

const msg: HTMLDivElement = document.createElement('div');
msg.innerText = `App1: is ${A_NUMBER} a number: ${is_number(A_NUMBER)}`;
document.body.appendChild(msg);