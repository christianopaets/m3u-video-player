import './styles/style.css';
import {App} from './app';

document.addEventListener('DOMContentLoaded', () => {
  App.instance
    .init()
    .listeners();
});

