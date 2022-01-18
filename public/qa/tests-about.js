suite('Test page', function(){
    test('page should contain a link to the news page', function(){
    assert($('a[href="/newsList-"]').length);
    });
   });