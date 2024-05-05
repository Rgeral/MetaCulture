//TODOO : METTRE LE JEU ET LINK SUR LE /MAIL

import React from 'react';

function Game() {
    return (
        <>
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                THIS IS A GAME !! WOuhou
            </span>
            <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/email"
              className="rounded-md bg-indigo-600 px-7 py-5 text-m font-semibold text-white shadow-sm hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Redirect to mail
            </a>
          </div>
        </>
    );
}

export default Game;