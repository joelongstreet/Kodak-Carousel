## Requests

### Application Load
1. When application loads, get the photoset list - http://www.flickr.com/services/api/explore/flickr.photosets.getList - and then store it.

2. Get each photoset primary photo id, retrieve it, store it with the previously saved photoset list (see abbreviation below).

3. Schedule photoset requests - http://www.flickr.com/services/api/explore/flickr.photosets.getPhotos, and store each photo url (see abbreviation below).

Photo URLs via abbreviation ---> 
  Additive  http://farm#{FARM}.staticflickr.com/#{SERVER}/#{ID}_#{SECRET}.jpg
  Example   http://farm8.staticflickr.com/7328/12109928955_95de6eeac7.jpg


### Client Request
* Client requests photo sets, server responds with quantity and poster, then goes and fetches again to "clear cache".
* Client request photo set. If set exists, server responds. If not, server fetches, responds and stores.




## Client Flow
* Prompt for data input, then initialze the server application. Enter into auth flow... MAYBE?!?!? - depends on how that darned leap motion works.
* Then start reqeust flow metioned above