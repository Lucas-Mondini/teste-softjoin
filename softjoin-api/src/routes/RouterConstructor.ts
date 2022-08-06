import Router from 'express'
import View from '../view';


export default class RouterConstructor {

    public static getCRUD(customView : View) {

        const router = Router();
        const view = customView;
        
        router.post('/',                        view.Create);
        router.get('/:id',                      view.Get);
        router.put('/',                         view.Update);
        router.delete('/:id',                   view.Delete);
        router.get('/',                         view.GetAll);

        return router;
    }
};