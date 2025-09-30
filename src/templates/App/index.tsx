import { useState } from 'react';
import { cards } from '../../data/cards';
import { Grid } from '../Grid';
import { StartScreen } from '../StartScreen';
import './styles.css';
import type { CardProps } from '../Card';

// Definimos o tipo para as chaves do nosso objeto de configuração
type LevelKey = '4x4' | '4x5' | '5x6' | '6x6';

const levelConfig: Record<LevelKey, number> = {
    '4x4': 8,  // 16 cartas / 2
    '4x5': 10, // 20 cartas / 2
    '5x6': 15, // 30 cartas / 2
    '6x6': 18, // 36 cartas / 2
};

export function App() {
    const [selectedLevel, setSelectedLevel] = useState<{ rows: number; cols: number } | null>(null);
    const [gameCards, setGameCards] = useState<CardProps[]>([]);

    const handleLevelSelect = (rows: number, cols: number) => {
        const shape = `${rows}x${cols}` as LevelKey; // <-- AQUI ESTÁ A CORREÇÃO
        const cardCount = levelConfig[shape];
        
        // Seleciona o número de cartas necessárias para o nível
        const selectedCards = cards.slice(0, cardCount);

        setGameCards(selectedCards);
        setSelectedLevel({ rows, cols });
    };

    const returnToMenu = () => {
        setSelectedLevel(null);
        setGameCards([]);
    };

    return (
        <div className="app">
            {!selectedLevel ? (
                <StartScreen onLevelSelect={handleLevelSelect} />
            ) : (
                <>
                    <button onClick={returnToMenu} className="back-button">Voltar ao Menu</button>
                    <Grid cards={gameCards} cols={selectedLevel.cols} rows={selectedLevel.rows} />
                </>
            )}
        </div>
    );
}