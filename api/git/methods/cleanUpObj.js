'use strict';

////////////////////////////////////////////////////////////
////////       polish obj returned by GitHub        ///////
//////////////////////////////////////////////////////////

module.exports = function (repo) {
    return {
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        owner: {
            login: repo.owner.login,
            id: repo.owner.id,
            html_url: repo.owner.html_url,
            type: repo.owner.type,
        },
        description: repo.description,
        private: repo.private,
        html_url: repo.html_url,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        clone_url: repo.clone_url,
        open_issues_count: repo.open_issues_count,
        forks: repo.forks
    } 
}