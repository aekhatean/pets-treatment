import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default applyMiddleware(thunk);

//this if file for applying different middlewares in the app and export them as one
