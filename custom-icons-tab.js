console.log('TEST');

// Define an object mapping tab IDs to icon URLs
var tabIcons = {
    "tab-paczka": "/wp-content/uploads/2024/03/box_color.png",
    "tab-paleta": "/wp-content/uploads/2024/03/pallet_color.png",
    "tab-nietypowa-paczka": "/wp-content/uploads/2024/03/bed_color.png"
};

// Loop through each tab and add the corresponding icon
var tabs = document.querySelectorAll('.nav.nav-simple.nav-normal.nav-size-normal.nav-center .tab');
tabs.forEach(function(tab) {
    var tabId = tab.getAttribute('id');
    var iconUrl = tabIcons[tabId];
    if (iconUrl) {
        var imgElement = document.createElement('img');
        imgElement.src = iconUrl;
        tab.querySelector('a').appendChild(imgElement);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded.');

    // Delay script execution for 1 second to ensure the DOM is fully loaded
    setTimeout(function() {
        // Process form with class .f-d-package
        processForm('.f-d-package');

        // Process form with class .f-d-pallet
        processForm('.f-d-pallet');

        // Process form with class .f-d-oversized-package
        processForm('.f-d-oversized-package');
    }, 1000); // Delay script execution for 1 second

    function processForm(formClass) {
        // Get all nf-fields-wrap elements
        var nfFieldsWrapElements = document.querySelectorAll(formClass + ' nf-fields-wrap');

        // Check if any nf-fields-wrap element exists
        if (nfFieldsWrapElements.length > 0) {
            // Loop through each nf-fields-wrap element
            nfFieldsWrapElements.forEach(function(nfFieldsWrap) {
                // Select all nf-field elements within the current form
                var nfFields = nfFieldsWrap.querySelectorAll('.nf-form-content' + formClass + ' nf-field');

                // Initialize variables to keep track of div1
                var div1 = document.createElement('div');
                div1.className = 'first-form-fields-group';

                var addedToDiv1 = false; // Flag to track if the first field is added to div1

                // Loop through the nf-fields
                for (var i = 0; i < nfFields.length; i++) {
                    var nfField = nfFields[i];

                    // Check if it's the first field containing the repeatable field
                    if (!addedToDiv1 && nfField.querySelector('.packages-params')) {
                        // Move the field to div1
                        nfFieldsWrap.insertBefore(div1, nfFieldsWrap.firstChild);
                        div1.appendChild(nfField);

                        addedToDiv1 = true; // Update the flag
                    }
                }

                console.log('Divs appended successfully for form with class:', formClass);
            });
        } else {
            console.error('nf-fields-wrap element not found for form with class:', formClass);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    //console.log('DOM fully loaded.');

    // Delay script execution for 1 second to ensure the DOM is fully loaded
    setTimeout(function() {
        // Process forms with classes .f-d-package, .f-d-pallet, and .f-d-oversized-package
        processForm('.f-d-package');
        processForm('.f-d-pallet');
        processForm('.f-d-oversized-package');
    }, 1000); // Delay script execution for 1 second

    function processForm(formClass) {
        // Get all nf-fields-wrap elements with the specified form class
        var fieldWrapElements = document.querySelectorAll('.nf-form-content' + formClass + ' nf-fields-wrap');

        // Check if nf-fields-wrap elements exist
        if (fieldWrapElements.length > 0) {
            // Loop through each nf-fields-wrap element
            fieldWrapElements.forEach(function(fieldWrap) {
                // Check if div.first-form-fields-group is present
                var firstGroupDiv = fieldWrap.querySelector('.first-form-fields-group');

                if (firstGroupDiv) {
                    // Select all nf-fields after div.first-form-fields-group
                    var nfFieldsAfterGroup = Array.from(fieldWrap.querySelectorAll('.first-form-fields-group ~ nf-field'));

                    // Get the count of nf-fields after div.first-form-fields-group
                    var nfFieldsCountAfterGroup = nfFieldsAfterGroup.length;

                    // Create div2 and div3
                    var div2 = document.createElement('div');
                    div2.className = 'second-form-fields-group';

                    var div3 = document.createElement('div');
                    div3.className = 'third-form-fields-group';

                    // Move the remaining nf-fields to div2 and div3
                    nfFieldsAfterGroup.forEach(function(nfField, index) {
                        if (index < 3) {
                            div2.appendChild(nfField);
                        } else {
                            div3.appendChild(nfField);
                        }
                    });

                    // Append div2 and div3 after div.first-form-fields-group
                    fieldWrap.appendChild(div2);
                    fieldWrap.appendChild(div3);

                    console.log('Fields grouped successfully for nf-fields-wrap with class:', formClass);
                    console.log('Number of nf-fields after div.first-form-fields-group:', nfFieldsCountAfterGroup);
                } else {
                    console.error('div.first-form-fields-group not found within nf-fields-wrap with class:', formClass);
                }
            });
        } else {
            console.error('nf-fields-wrap elements not found with class:', formClass);
        }
    }
});


