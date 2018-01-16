//Waits until the DOM is loaded, and then runs our JavaScript
$(document).ready(function() {
   
    //On page load, make an AJAX request to our API endpoint to retrieve all friends
    $.ajax({
        url: 'http://rest.learncode.academy/api/awashburn/friends',
        type: 'Get'
    }).done( (data) => {
        //When we get an array of friends back, iterate over the array
        data.forEach( (eachFriend) => {
            //For each friend, construct their full name and build a list-item from that
            let name = eachFriend.firstName + " " + eachFriend.lastName;
            let newElement = createFriend(name, eachFriend.id);
            //Append that new list-item to our unordered list
            $('#friend-list').append(newElement);
        })
        
    }).fail( () => {
        //If our request fails, alert the user
        alert('AJAX call failed, unable to retrieve friends.');
    })
    
    
    //On page load, make a click event listener for our Add A New Friend button
    $("#friend-form").submit( (e) => {
        //Stop the page from refreshing, and then get the value from the input field
        e.preventDefault();
        let newFriend = $('#input').val();
        
        //Split the name based on the first space we find
        let firstName = newFriend.substr(0, newFriend.indexOf(' '));
        let lastName = newFriend.substr(newFriend.indexOf(' ')+1);
        //Send the new friend's information to the API
        $.ajax({
            url: 'http://rest.learncode.academy/api/awashburn/friends',
            type: 'POST',
            data: {
                firstName: firstName,
                lastName: lastName,
                email: `${firstName}@${lastName}.com`
            }
        
    }).done( (data)  => {
        //When the API sends us the success message, construct a list-item and add it to the unordered list
        let newElement = createFriend(newFriend, data.id);
        $('#friend-list').append(newElement);
        //Clear the input field
        $('#input').val("");
    }).fail( () => {
        //If our request fails, alert the user
        alert('AJAX call failed, unable to POST new friend.');
    })
        
});

//On page load, make a click even listener for our unordered list
//When someone clicks a list-item, this function with fire    

$('#friend-list').on('click', 'li', function(e) {
    //Make an ajax request to delete the friend from the API
    //We get the ID from the click event details    
    $.ajax({
            url: `http://rest.learncode.academy/api/awashburn/friends/${e.target.id}`,
            type: 'DELETE'
        }).done( () => {
            //When the ajax request succeeds, remove this list-item from the HTML
            $(this).remove();
        }).fail( () => {
            //If our request fails, alert the user
            alert('AJAX call failed, unable to DELETE friend.');
        })
    })

    //This function creates an <li> HTML element for a friend, given a name and an ID
    //Also appliese CSS classes to the element for appropriate styling
    function createFriend(name, id) {
        return $(`<li>${name}</li>`).addClass('list-group-item list-group-item-action list-group-item-dark').attr('id', id);
    }

});