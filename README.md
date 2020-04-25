# javascript-embedding-wordpress-contents
This is javascript snippets.
You can embed your wordpress contents into html pages which is not under wordpress directories


## How to use
Set values of the following scripts in the top of main.js. 

```
const wpjson = '[YOUR-WP-JSON]';
const embeddedElementId= '[YOUR-HTML-ID]';
const embeddedArticlesNumber = 3; // number of artilces. Customise as you like.
```

## Output (embeddedArticlesNumber = 1)
```
<li>
  <a href="https://path-to-your-articles/" target="_blank">
    <span class="published_at">2020.00.00</span>
    <span class="cate_name">CATEGORY</span>
    <span class="news_ttl">TITLE</span>
  </a>
</li>
```
