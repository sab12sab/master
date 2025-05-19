import React from 'react';

export default function Section_Histoire() {
    return (
        <>
            <section className="w-full flex flex-col items-center text-center mb-16">
                <div className="max-w-3xl p-10">
                    <div className="flex justify-center">
                        <img
                            src="photos\bague.png"
                            alt="Les fondatrices de Golden Spark"
                            className="w-64 h-auto rounded-lg mb-8"
                            // Remplacé w-full max-w-4xl par w-64 (256px)
                        />
                    </div>
                    
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Golden Spark est bien plus qu'une simple marque de bijoux — c'est le fruit d'une belle amitié entre trois passionnées de mode et de créativité. L'idée est née d'un simple échange entre amies autour de notre amour commun pour les bijoux uniques, modernes et accessibles. Petit à petit, ce projet s'est transformé en une véritable aventure entrepreneuriale, qui nous a non seulement permis de partager notre passion, mais aussi de renforcer notre lien. Travailler ensemble sur Golden Spark nous a rapprochées plus que jamais. Le nom "Golden Spark" est venu naturellement : il représente à la fois l'éclat doré de nos bijoux en acier inoxydable, et l'étincelle d'amitié et d'ambition qui nous unit.
                    </p>
                </div>
            </section>
        </>
    );
}