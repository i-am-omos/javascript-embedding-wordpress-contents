const wpjson = 'https://kasan.tokyo/news/wp-json/wp/v2/posts';    
const embeddedElementId= 'news';
const embeddedArticlesNumber = 3;

function EmbeddingWpArticles() {}
EmbeddingWpArticles.prototype = {
  getPosts: function() {
    function setJson() {
      return new Promise(function(resolve, reject) {
        const req = new XMLHttpRequest();
        req.open('GET', wpjson);
        req.responseType = 'json';
        req.send();
        req.onload = function() {
          res = req.response;
          jsonData = req.response;
          resolve(true);
        }
      });
    }
    function rebindThis() {
      this.jsonData = jsonData;
      this.setNews();
    }

    setJson()
    .then(function(resolve) {
      let fn = rebindThis.bind(instance);
      fn();
    });
  },
  setNews: function() {
    var b = '';
    var c = document.getElementById(embeddedElementId);
    var now = new Date();
    for(var i = 0; i < embeddedArticlesNumber; i++) {
      var published_at = this.formatDate(new Date(this.jsonData[i].date), 'YYYY.MM.DD');    
      var diff = this.dateDiff(new Date(this.jsonData[i].date), now);
      if(diff < 7) { 
        b += '<li><a href="' + this.jsonData[i].link + '" target="_blank"><span class="published_at">' + published_at + '</span><span class="cate_name">' + this.jsonData[i].category_name + '</span><span class="news_ttl">' + this.jsonData[i].title.rendered + "</span><div class='ribbon18-content'><span class='ribbon18'>NEW</span></div></a></li>";
      } else {
        b += '<li><a href="' + this.jsonData[i].link + '" target="_blank"><span class="published_at">' + published_at + '</span><span class="cate_name">' + this.jsonData[i].category_name + '</span><span class="news_ttl">' + this.jsonData[i].title.rendered + "</span></a></li>";
      }
    }     
    c.innerHTML = b;
  },    
  formatDate: function (date, format) {
    if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
      var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
      var length = format.match(/S/g).length;
      for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1)); 
    }
    return format;
  },    
  dateDiff: function (date1, date2) {
    var diff = date2.getTime() - date1.getTime();
    return ~~(diff / (24 * 60 * 60 * 1000));
  },    
}

const instance = new EmbeddingWpArticles();
window.addEventListener("load", instance.getPosts);
