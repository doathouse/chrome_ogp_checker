getPageInformation();

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse)
  {
    getPageInformation();
  }
);

/**
 *
 *
 */
function getPageInformation()
{
	var port = chrome.extension.connect({name:"ogpcheck"});

	var ogp_title        = $("meta[property='og:title']").attr("content");
	var ogp_url          = $("meta[property='og:url']").attr("content");
	var ogp_image        = $("meta[property='og:image']").attr("content");
	var ogp_description  = $("meta[property='og:description']").attr("content");
	var site_description = $("meta[name='description'], meta[name='Description']").attr("content");
	var site_keywords    = $("meta[name='keywords'], meta[name='Keywords']").attr("content");
	var link_canonical   = $("link[rel='canonical']").attr("href");

	var site_title = window.document.title;
	var site_h1    = '';

	$("h1").each(function(){
		site_h1 += '<h3>site:h1</h3><p>' + $(this).html() + '</p>';
		//console.log($(this).html());
	});
	//console.log(site_h1);

	port.postMessage({
		ogp_title: ogp_title, 
		ogp_url: ogp_url, 
		ogp_image: ogp_image, 
		ogp_description: ogp_description, 
		link_canonical: link_canonical, 
		site_title: site_title,
		site_h1: site_h1,
		site_keywords: site_keywords, 
		site_description: site_description, 
		status:"start"
	});

	port.onMessage.addListener(function(msg){
		console.log(msg.status);
		if (msg.status == "loading"){
			port.postMessage({status: "loading"});
		}
	});
}


