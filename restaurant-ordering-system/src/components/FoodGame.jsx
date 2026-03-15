import { useState, useEffect, useRef } from 'react';

const FoodGame = ({ isOpen, onClose }) => {
  const [gameState, setGameState] = useState('START'); // START, PLAYING, END
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [basketPos, setBasketPos] = useState(50); // percentage 0-100
  const [items, setItems] = useState([]);
  const gameRef = useRef(null);
  const basketPosRef = useRef(50);

  const foodIcons = ['🍔', '🍕', '🍟', '🍗', '🍦', '🍩'];
  const [isLocked, setIsLocked] = useState(false);


  // Reset game whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      setGameState('START');
      setScore(0);
      setTimeLeft(30);
      setItems([]);
    }
  }, [isOpen]);

  useEffect(() => {
    basketPosRef.current = basketPos;
  }, [basketPos]);

  useEffect(() => {
    if (gameState !== 'PLAYING' || !isOpen || !isLocked) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setGameState('END');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, isOpen, isLocked]);


  useEffect(() => {
    if (gameState !== 'PLAYING' || !isOpen || !isLocked) return;

    const spawnItem = setInterval(() => {
      const newItem = {
        id: Date.now(),
        x: Math.random() * 90 + 5,
        y: -10,
        icon: foodIcons[Math.floor(Math.random() * foodIcons.length)]
      };
      setItems((prev) => [...prev, newItem]);
    }, 600);

    const moveItems = setInterval(() => {
      setItems((prev) => {
        return prev
          .map((item) => ({ ...item, y: item.y + 2.5 }))
          .filter((item) => {
            if (item.y > 85 && item.y < 95) {
                const distance = Math.abs(item.x - basketPosRef.current);
                if (distance < 12) {
                    setScore(s => s + 10);
                    return false;
                }
            }
            return item.y < 110;
          });
      });
    }, 50);

    return () => {
      clearInterval(spawnItem);
      clearInterval(moveItems);
    };
  }, [gameState, isOpen, isLocked]);


  useEffect(() => {
    const handleLockChange = () => {
        setIsLocked(document.pointerLockElement === gameRef.current);
    };
    document.addEventListener('pointerlockchange', handleLockChange);
    return () => document.removeEventListener('pointerlockchange', handleLockChange);
  }, []);

  const lockPointer = () => {
    if (gameState === 'PLAYING' && gameRef.current && !document.pointerLockElement) {
        // Wrap in try-catch as some browsers require a click even for re-locking
        try {
            const promise = gameRef.current.requestPointerLock();
            if (promise && promise.catch) {
                promise.catch(() => {
                    // Fail silently - browser likely requires a click
                });
            }
        } catch (e) {
            // Fail silently
        }
    }
  };

  useEffect(() => {
    if (gameState === 'PLAYING' && isOpen) {
        lockPointer();
    }
    return () => {
        if (document.pointerLockElement) document.exitPointerLock();
    };
  }, [gameState, isOpen]);

  const handleMouseMove = (e) => {
    if (gameState !== 'PLAYING') return;
    
    // In Pointer Lock mode, we use movementX for better accuracy
    if (document.pointerLockElement) {
        setBasketPos(prev => {
            const next = prev + (e.movementX * 0.1); // Sensitivity factor
            return Math.min(Math.max(next, 5), 95);
        });
    } else {
        // Fallback for non-locked movement
        const rect = gameRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        setBasketPos(Math.min(Math.max(x, 5), 95));
    }
  };

  const handleTouchMove = (e) => {
    if (gameState !== 'PLAYING') return;
    const rect = gameRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    setBasketPos(Math.min(Math.max(x, 5), 95));
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setItems([]);
    setGameState('PLAYING');
  };

  // Effect to lock scroll and manage cursor
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
        className="modal-overlay" 
        style={{
            background: 'rgba(0,0,0,0.95)', 
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
      <div 
        className="modal-content" 
        style={{
            maxWidth: '650px', 
            width: '90%',
            padding: '30px', 
            textAlign: 'center', 
            background: '#fff', 
            border: '5px solid #ff5722',
            position: 'relative'
        }}
      >
        <button 
            className="close-modal" 
            onClick={() => {
                if (document.pointerLockElement) document.exitPointerLock();
                onClose();
            }}
            style={{top: '10px', right: '15px', cursor: 'pointer', zIndex: 10001}}
        >
            &times;
        </button>
        
        <h2 style={{color: '#ff5722', marginBottom: '5px'}}>Catch Your Order! 🎮</h2>
        <p style={{fontSize: '14px', color: '#666', marginBottom: '15px'}}>
            {gameState === 'PLAYING' 
                ? (isLocked ? 'Move mouse to move tray. Press Esc to unlock.' : 'Click or hover inside box to re-lock cursor!') 
                : 'Help us catch the falling snacks!'}
        </p>

        <div 
            ref={gameRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseEnter={lockPointer}
            onClick={lockPointer}
            style={{
                width: '100%',
                height: '400px',
                background: '#f9f9f9',
                border: '2px dashed #ff5722',
                borderRadius: '15px',
                position: 'relative',
                overflow: 'hidden',
                cursor: (gameState === 'PLAYING' && isLocked) ? 'none' : 'default',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.05)'
            }}
        >
            {gameState === 'START' && (
                <div style={{paddingTop: '120px'}}>
                    <div style={{fontSize: '50px', marginBottom: '20px'}}>🎁</div>
                    <p style={{marginBottom: '20px', fontWeight: 'bold'}}>Are you ready to beat the clock?</p>
                    <button onClick={startGame} className="view-menu-btn" style={{padding: '15px 40px', fontSize: '18px'}}>
                        Start Game
                    </button>
                    <p style={{marginTop: '20px', fontSize: '13px', color: '#888'}}>Tip: Move your mouse left & right</p>
                </div>
            )}

            {gameState === 'PLAYING' && !isLocked && (
                <div 
                    onClick={lockPointer}
                    className="resume-overlay"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.4)',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 100,
                        cursor: 'pointer',
                        backdropFilter: 'blur(3px)'
                    }}
                >
                    <div style={{fontSize: '40px', marginBottom: '10px'}}>👆</div>
                    <div style={{fontWeight: 'bold', fontSize: '20px'}}>CLICK TO RESUME</div>
                    <div style={{fontSize: '12px', opacity: 0.8, marginTop: '5px'}}>The browser needs a click to re-lock your mouse</div>
                </div>
            )}

            {gameState === 'PLAYING' && (
                <>
                    <div style={{position: 'absolute', top: '15px', left: '25px', background: 'white', padding: '5px 15px', borderRadius: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', fontWeight: 'bold'}}>
                        Points: {score}
                    </div>
                    <div style={{position: 'absolute', top: '15px', right: '25px', background: timeLeft < 10 ? '#ffebee' : 'white', color: timeLeft < 10 ? '#f44336' : '#333', padding: '5px 15px', borderRadius: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', fontWeight: 'bold'}}>
                        Timer: {timeLeft}s
                    </div>

                    
                    {items.map(item => (
                        <div 
                            key={item.id} 
                            style={{
                                position: 'absolute',
                                left: `${item.x}%`,
                                top: `${item.y}%`,
                                fontSize: '35px',
                                transform: 'translateX(-50%)',
                                filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))'
                            }}
                        >
                            {item.icon}
                        </div>
                    ))}

                    <div 
                        style={{
                            position: 'absolute',
                            bottom: '15px',
                            left: `${basketPos}%`,
                            fontSize: '60px',
                            transform: 'translateX(-50%)',
                            transition: 'bottom 0.1s'
                        }}
                    >
                        🍽️
                    </div>
                </>
            )}

            {gameState === 'END' && (
                <div style={{paddingTop: '100px'}}>
                    <div style={{fontSize: '60px'}}>🏆</div>
                    <h2 style={{color: '#ff5722', fontSize: '30px'}}>Great Effort!</h2>
                    <p style={{fontSize: '24px', margin: '15px 0'}}>You scored <strong>{score}</strong> points!</p>
                    <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px'}}>
                        <button 
                            onClick={startGame} 
                            className="btn-premium btn-primary"
                            style={{padding: '12px 30px'}}
                        >
                            🔄 Try Again
                        </button>
                        <button 
                            onClick={onClose} 
                            className="btn-premium btn-outline"
                            style={{padding: '12px 30px'}}
                        >
                            🔚 Exit Game
                        </button>
                    </div>

                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FoodGame;

