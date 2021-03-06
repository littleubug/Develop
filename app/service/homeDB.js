// 连接数据库

const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/test', 
    {useNewUrlParser: true, useUnifiedTopology: true}
);

var Schema = mongoose.Schema;

var example = new Schema({
  things: {      
      type:String,
      require:true   
  }
});

var list = mongoose.model('Thing', example);

// service

'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async getHomeContent() {    
 
    const todolist = await list.find(function(err, ret) {
      if (err) console.log('find error');
    })
    
    await this.ctx.render('homeDB.html',{output:todolist});
  }

  async getPost() {
    var content = this.ctx.request.body;
    if (content.things != '') {
      var data = new list(content);
      data.save(function(err, ret) {
        if (err) console.log('save failed');
        });
    }
     
    this.ctx.redirect('/');
  }

  async delValue() {
    var id = this.ctx.params;

    list.deleteOne(id, function(err) {
      if (err) console.log('del failed');
    });

    this.ctx.redirect('/');
  }
}

module.exports = HomeService;
