
var _ = require('lodash');
var Cat = require('./cat_model.js');

module.exports = function(app) {


   app.post('/cat', function(req, res) {
      var newCat = new Cat(req.body);

      newCat.save(function(err) {
         if (err) {
            res.json({ info: 'error during cat create', error: err });
         }
         res.json({ info: 'cat created successfully' });
      });
   });

   app.get('/cat', function(req, res) {
      Cat.find(function(err, cats) {
         if (err) {
            res.json({ info: 'error finding the cats', error: 'err' });
         }
         res.json({ info: 'found the cats', data: cats });
      });
   });

   app.get('/cat:id', function(req, res) {
      Cat.findById(req.params.id, function(err, cat) {
         if (err) {
            res.json({ info: 'error finding the cat', error: 'err' });
         }
         if (cat) {
            res.json({ info: 'cat found successfully', data: cat });
         } else {
            res.json({ info: 'cat not found' });
         }
      });

   });

   app.put('/cat/:id', function(req, res) {
      Cat.findById(req.params.id, function(err, cat) {
         if (err) {
            res.json({ info: 'error when trying to find the cat', error: err });
         }
         if (cat) {
            _.merge(cat, req.body);
            cat.save(function(err) {
               if (err) {
                  res.json({ info: 'error during the cat update', error: err });
               }
               res.json({ info: 'cat updated successfully' });
            });

         } else {
            res.json({ info: 'cat not found' });
         }
      });
   });

   app.delete('/cat/:id', function(req, res) {
      Cat.findByIdAndRemove(req.params.id, function(err) {
         if (err) {
            res.json({ info: 'Error when deleting', error: err });
         }
         res.json({ info: 'cat deletet successfully' });

      });

   });
};
