import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Transition } from 'history';

export function useBlocker(message: string, when: boolean, history: History) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingTx, setPendingTx] = useState<Transition | null>(null);

    const unblock = useRef<() => void>();

    useEffect(() => {
        if (!when) return;

        // Block navigation with history.block and store the unblock function in a ref
        unblock.current = history.block((tx) => {
            setIsModalOpen(true);
            setPendingTx(tx); // Store the pending transition
        });

        // Handle back navigation (including mobile swipe-back) with popstate
        const handlePopState = (event: PopStateEvent) => {
            if (when) {
                setIsModalOpen(true);
                // Use history.replaceState to prevent default back action on swipe
                window.history.pushState(null, document.title, window.location.href);
            }
        };

        // Attach the popstate listener
        window.addEventListener('popstate', handlePopState);

        // Clean up: Unblock on component unmount or if `when` changes
        return () => {
            if (unblock.current) {
                unblock.current();
            }
            window.removeEventListener('popstate', handlePopState);
        };
    }, [when, history]);

    const confirmNavigation = () => {
        if (pendingTx) {
            setIsModalOpen(false);
            if (unblock.current) {
                unblock.current(); // Unblock navigation
            }
            navigate(pendingTx.location.pathname); // Perform navigation
            setPendingTx(null); // Clear the pending transition
        }
    };

    const cancelNavigation = () => {
        setIsModalOpen(false);
        setPendingTx(null); // Clear the pending transition
    };

    return { isModalOpen, confirmNavigation, cancelNavigation };
}
