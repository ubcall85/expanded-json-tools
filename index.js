/*
    КОРОЧЕ НАХУЙ
    ЧТО ЭТА ЕБАЛА ДЕЛАЕТ?

    РАБОТАЕТ С ЖСОНОМ
    ВСЕ НАХУЙ

    Expanded JSON Tools (EJT) aka node-ejt package
*/

const fs = require( 'fs' );

function Ilya_Degenerat( blob ) {
    return (new Function(`return ${blob};`))();
}

// Инициализатор нахуй
function EJT() {

    /* Дело в том, что при экспорте SQL дата базы в формате JSON, phpMyAdmin бьет
    дб на жсон, в котором вложено несколько объектов. У каждого объекта таблицы есть type
    = 'table' и name, отвечающий за его имя. Вот по этому name мы и ищем таблицы.
    */

    this.__database = [];
    this.__last_filename = '';

    this.readFromFile = function( file='./database.json' ) {
        this.__last_filename = file;
        const promise = (new Promise(function(resolve, reject){

            fs.readFile( file, 'utf8', (err, res) => {

                if (err) reject(err);
                resolve(Ilya_Degenerat(res));
    
            } )

        }))

        promise.then( base => this.__database = base );
        
        return promise;
    }

    this.db = _ => this.__database; // shortcut

    /*
        params = {
            user_id: 1,
            id: 1
        }

        (к примеру), это значит что мы в какой-то таблице найдем все вхождения
        с юзерайди = 1 И айди = 1
    */

    this.search_table = function( table_name, params ) {

        const result = [];
        let scope = [];


        for ( let section of this.db().filter( ({type}) => type == "table" ) ) {

            if ( section.name == table_name ) {

                scope = section.data;

            }

        }

        for ( let record of scope ) {

            let eq = 0;

            for ( let key of Object.keys(params) ) {

                if ( record[key] && record[key] == params[key] ) {
                    eq++

                }

            }

            if ( eq == Object.keys(params).length ) result.push( record );

        }

        return result;

    }

    this.update_table = function( table_name, params, new_data ) {

        const result = [];
        let scope = [];

        for ( let section of this.__database ) {

            if ( section.name == table_name ) {

                scope = section.data;

            }

        }

        for ( let record of scope ) {

            let eq = 0;

            for ( let key of Object.keys(params) ) {

                if ( record[key] && record[key] == params[key] ) {

                    eq++

                }

            }

            if ( eq == Object.keys(params).length ) {

                for ( let key in new_data ) {

                    record[key] = new_data[key];

                }

            }

        }

        fs.writeFile( this.__last_filename, JSON.stringify(this.__database), ( err ) => {

            this.readFromFile( this.__last_filename )

        } );

    }

    this.delete_from_table = function( table_name, params ) {

        const result = [];
        let scope = [];

        for ( let section of this.__database ) {

            if ( section.name == table_name ) {

                scope = section.data;

            }

        }

        for ( let i in scope ) {

            let record = scope[i];
            let eq = 0;

            for ( let key of Object.keys(params) ) {

                if ( record[key] && record[key] == params[key] ) {

                    eq++

                }

            }

            if ( eq == Object.keys(params).length ) {

                scope.splice(i, 1);

            }

        }

        fs.writeFile( this.__last_filename, JSON.stringify(this.__database), ( err ) => {

            this.readFromFile( this.__last_filename )

        } );

    }

}

module.exports = (new EJT());