var unleash = require('../dist');

var client = new unleash.ApiClient(
        {
            token:'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImxvbmRvbi0yMDI0LTAyIn0.eyJpZCI6IjQzZmEzMTZlLWI5YzctNGIzMy04MTM0LWU2M2YwMGI1NTU4MyIsImFjY291bnRJZCI6IjFiM2RlNGE0ZGI0YzQ4Nzk4N2U5NTNlYjhkM2U3ODIyIiwid29ya3NwYWNlSWQiOiIxMTk4MWZiYmY3NDQ0YzliOTRmMzJjMGVkYzg5ZWU5OCIsInNjb3BlIjoiQWNjb3VudEltcGVyc29uYXRpb24iLCJpc3MiOiJhY2NvdW50cyJ9.HebAzrhfGT1g2xAvZaZi0HWATh_KCLijbQ7ZUX-2UWUS0dZfpbzLERdhRzFbTTlbLzmIFDz_6WFqcJJDi23A5PJkh08V0OK6UhThILNVAFHIqH7ufdO3fGvpybR5lkCzJjSopcP3JJl6vmo14RxPOQaHiTsCiannpE8YRfY_uI4FCeYvWl4UkwDRvj_YuQA4ecG8xNTXhyBce0B0VXVTzzQK_p8LRnswnXkbxQ5baEBDnxh-k0g0pFo-wiL1ZHoCQasuqQsUsqLplb-VXNSA5voJ7Ygzuq5bFKVm7pyji3nh8a3_qt_i5vpjFLcrA3q9Ppv66t17NB0D1JvAXp53lg',
            account:'itay@unleash.so',       
            endpoint:'https://e-api.london.unleash.team'     
        });


async  function getAnswer()
{
    try {
        var response = 
            await 
            client
            .assistants    
            .answer({ query: 'how to use golinks'})
        console.log(response);
    }catch(e){
        console.error(e);
    }

}

getAnswer();


