


exports.contacts = function (request, response) {
    response.render("contact", {title:"Contacts",isContacts:true, pageTestScript: '/qa/tests-about.js'});
};
