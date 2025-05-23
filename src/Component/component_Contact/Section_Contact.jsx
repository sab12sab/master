import { AuthContext } from '@/ContexT/ContextAPI';
import React, { useContext, useState } from 'react';

export default function Section_Contact() {
    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const { cree_contact } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');
        try {
            await cree_contact({ nom, email, description });
            setSuccess('Votre message a été envoyé avec succès.');
            setNom('');
            setEmail('');
            setDescription('');
        } catch (err) {
            setError("Une erreur s'est produite. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full flex flex-col items-center text-center mb-16">
            <div className="w-11/12 max-w-2xl p-10 bg-white rounded-lg shadow">
                <div className="flex justify-center">
                    <img
                        src="/photos/contact.png"
                        alt="Contact Golden Spark"
                        className="w-48 h-auto rounded-lg mb-8"
                    />
                </div>
                <h2 className="text-2xl font-bold mb-6">Contactez-nous</h2>
                <form onSubmit={handleSubmit} className="w-full mx-auto text-left">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Nom
                        </label>
                        <input
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Votre nom"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="votre@email.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                            id="message"
                            placeholder="Votre message"
                            required
                        />
                    </div>
                    {success && <div className="mb-4 text-green-600">{success}</div>}
                    {error && <div className="mb-4 text-red-600">{error}</div>}
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Envoi...' : 'Envoyer'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}