import sys
import pymongo
import os

# request_data = {
#             "mongo_uri_key": os.getenv("mongo_uri")
#         }
# uri = request_data.get("mongo_uri_key")
uri = "mongodb://saul_mdo:Mssauce97@ds151450.mlab.com:51450/labweb?retryWrites=false"

###############################################################################
# main
###############################################################################

def main(args):

    client = pymongo.MongoClient(uri)
    SEED_DATA = [
        {
            'decade': '1970s',
            'artist': 'Debby Boone',
            'song': 'You Light Up My Life',
            'weeksAtOne': 10
        },
        {
            'decade': '1980s',
            'artist': 'Olivia Newton-John',
            'song': 'Physical',
            'weeksAtOne': 10
        },
        {
            'decade': '1990s',
            'artist': 'Mariah Carey',
            'song': 'One Sweet Day',
            'weeksAtOne': 16
        }
    ]
          
    db = client.get_default_database()
    
    songs = db['songs']

    # songs.insert_many(SEED_DATA)

    query = {'song': 'One Sweet Day'}

    songs.update(query, {'$set': {'artist': 'Mariah Carey ft. Boyz II Men'}})

    cursor = songs.find({'weeksAtOne': {'$gte': 10}}).sort('decade', 1)

    for doc in cursor:
        print ('In the %s, %s by %s topped the charts for %d straight weeks.' %
               (doc['decade'], doc['song'], doc['artist'], doc['weeksAtOne']))

    client.close()


if __name__ == '__main__':
    main(sys.argv[1:])