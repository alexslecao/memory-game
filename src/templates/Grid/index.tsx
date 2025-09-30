import { useRef, useState } from "react";
import { Card, type CardProps } from "../Card";
import './styles.css';
import { duplicateRegenerateSortCards } from "../../utils/card-game";

export interface GridProps {
    cards: CardProps[];
    cols: number;
    rows: number;
}

export function Grid({ cards, cols, rows }: GridProps) {
    const [stateCards, setStateCards] = useState(() => {
        return duplicateRegenerateSortCards(cards);
    });

    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);

    const first = useRef<CardProps | null>(null);
    const second = useRef<CardProps | null>(null);

    const wrong = useRef(false);

    //-Verifica se o jogo terminou
    const isFinished = matches === cards.length;

    function handleReset(): void {
        setStateCards(duplicateRegenerateSortCards(cards));

        setMoves(0);
        setMatches(0);

        first.current = null;
        second.current = null;
        
        wrong.current = false;
    }

    function handleClick(id: string): void {
        //-Impede cliques adicionais se o jogo já terminou
        if (isFinished) return;

        const newStateCards = stateCards.map(card => {
            //-Se o cartão não for o cartão clicado 
            if (id != card.id)
                return card;

            //-Se o cartão já estiver virado não faz nada
            if (card.flipped)
                return card;

            //-Desvira por estar errado
            if (wrong.current && first.current && second.current) {
                wrong.current = false;

                first.current.flipped = false;
                second.current.flipped = false;

                first.current = null;
                second.current = null;
            }

            //-Vira o cartão
            card.flipped = true;

            //-Grava o primeiro e o segundo cartão clicado
            if (first.current == null) {
                first.current = card;
            } else if (second.current == null) {
                second.current = card;
            }

            //-Se os dois estão virados, verifico se são compatíveis
            if (first.current && second.current) {
                setMoves((m) => m + 1);

                //-Verifica se acertou
                if (first.current.back == second.current.back) {
                    setMatches((m) => m + 1);

                    first.current = null;
                    second.current = null;
                } else {
                    //-Desvira os cartões errados no próximo click
                    wrong.current = true;
                }
            }

            return card;
        });

        setStateCards(newStateCards);
    }

    return (
        <div className="grid-wrapper">
            <div className="text">
                <h1>Memory Game</h1>
                <p>Moves: {moves} | Matches: {matches} | <button disabled={moves == 0} onClick={() => handleReset()} className="reset">Reset</button></p>
            </div>
            {isFinished && (
                <div className="congrats-message">
                    <h2>Parabéns, você venceu!</h2>
                    <p>Você completou o jogo em {moves} movimentos.</p>
                    <button onClick={() => handleReset()} className="reset">Jogar Novamente</button>
                </div>
            )}
            <div 
                className="grid" 
                style={{ 
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)` // Adiciona as linhas dinâmicas
                }}
            >
                {stateCards.map(card => <Card {...card} key={card.id} handleClick={handleClick} />)}
            </div>
        </div>
    )
}