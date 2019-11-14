function GetCrossRefAuthors(the_doi) {
  //var the_doi = "10.1016/j.nbt.2013.04.004";
  //var the_doi = "10.1016/B978-0-12-814332-2.00011-3";
  //var the_doi = "10.13031/2013.31456";
  var url_string = "https://api.crossref.org/v1/works/" + the_doi;
  var response = UrlFetchApp.fetch(url_string);
  var content = response.getContentText();
  var json = JSON.parse(content);
  
  var authors = json['message']['author'];
  var all_authors = [];
  for(var x in authors){
    if(!('given' in authors[x])){
      all_authors.push(authors[x]['family']);
    } else if(authors[x]['sequence'] == 'first'){
      if(/\s/.test(authors[x]["given"])){
        all_authors.push(authors[x]['given'][0] + '.' + ' ' + authors[x]["given"][authors[x]["given"].indexOf(' ') + 1] + ". " + authors[x]['family']);
      } else {
        all_authors.push(authors[x]['given'][0] + '.' + ' ' + authors[x]['family']);
      }      
    } else if(authors[x]['sequence'] == 'additional'){
      if(/\s/.test(authors[x]["given"])){
        all_authors.push(authors[x]['given'][0] + '.' + ' ' + authors[x]["given"][authors[x]["given"].indexOf(' ') + 1] + ". " + authors[x]['family']);
      } else {
        all_authors.push(authors[x]['given'][0] + '.' + ' ' + authors[x]['family']);
      }
    }
  } 
    
//  if(all_authors.length > 1){
//    all_authors.splice(all_authors.length-1, 0, '; ');
//    var last_two_items = all_authors.slice(all_authors.length-2);
//    last_two_items = last_two_items.join(' ');
//    all_authors.splice(all_authors.length-2, all_authors.length, last_two_items);
//  }
  all_authors = all_authors.join('; ');
  
  Logger.log(all_authors)
  Logger.log(/\s/.test(authors[x]["given"]))
  Logger.log(authors[x]["given"][authors[x]["given"].indexOf(' ') + 1])
  return all_authors
  
}
