import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from "expo-av";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// 타입 정의
interface CheeringSong {
    id: string;
    title: string;
    uri: string;
    artist?: string;
}

interface PlaybackState {
    position: number;
    duration: number;
    isPlaying: boolean;
    isLoaded: boolean;
}

const ExpoMusicPlayer: React.FC = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [playbackState, setPlaybackState] = useState<PlaybackState>({
        position: 0,
        duration: 0,
        isPlaying: false,
        isLoaded: false,
    });

    // 응원가 목록
    const cheeringSongs: CheeringSong[] = [
        {
            id: "1",
            title: "우리는 하나",
            uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            artist: "응원단",
        },
        {
            id: "2",
            title: "승리의 함성",
            uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            artist: "응원단",
        },
        {
            id: "3",
            title: "파이팅 송",
            uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            artist: "응원단",
        },
    ];

    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

    useEffect(() => {
        // 오디오 세션 설정
        const setupAudio = async (): Promise<void> => {
            try {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                    staysActiveInBackground: true,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    playThroughEarpieceAndroid: false,
                });
            } catch (error) {
                console.error("오디오 모드 설정 실패:", error);
            }
        };

        setupAudio();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    const onPlaybackStatusUpdate = useCallback(
        (status: AVPlaybackStatus): void => {
            if (status.isLoaded) {
                const loadedStatus = status as AVPlaybackStatusSuccess;
                setPlaybackState({
                    position: loadedStatus.positionMillis || 0,
                    duration: loadedStatus.durationMillis || 0,
                    isPlaying: loadedStatus.isPlaying,
                    isLoaded: true,
                });

                // 곡이 끝났을 때 다음 곡 자동 재생
                if (loadedStatus.didJustFinish) {
                    playNext();
                }
            } else {
                setPlaybackState((prev) => ({
                    ...prev,
                    isLoaded: false,
                    isPlaying: false,
                }));

                if (status.error) {
                    console.error("재생 오류:", status.error);
                    Alert.alert("재생 오류", "음악을 재생할 수 없습니다.");
                }
            }
        },
        []
    );

    const loadAudio = async (uri: string): Promise<void> => {
        try {
            // 기존 사운드가 있으면 언로드
            if (sound) {
                await sound.unloadAsync();
                setSound(null);
            }

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: false },
                onPlaybackStatusUpdate
            );

            setSound(newSound);
        } catch (error) {
            console.error("오디오 로드 실패:", error);
            Alert.alert("로드 오류", "음악 파일을 불러올 수 없습니다.");
        }
    };

    const togglePlayPause = async (): Promise<void> => {
        try {
            if (!sound) {
                await loadAudio(cheeringSongs[currentSongIndex].uri);
                return;
            }

            if (playbackState.isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
        } catch (error) {
            console.error("재생/정지 실패:", error);
            Alert.alert("재생 오류", "음악을 재생할 수 없습니다.");
        }
    };

    const playNext = async (): Promise<void> => {
        const nextIndex = (currentSongIndex + 1) % cheeringSongs.length;
        setCurrentSongIndex(nextIndex);
        await loadAudio(cheeringSongs[nextIndex].uri);

        // 새로운 사운드 객체가 생성된 후 재생
        setTimeout(async () => {
            if (sound) {
                try {
                    await sound.playAsync();
                } catch (error) {
                    console.error("다음 곡 재생 실패:", error);
                }
            }
        }, 100);
    };

    const playPrevious = async (): Promise<void> => {
        const prevIndex =
            currentSongIndex === 0
                ? cheeringSongs.length - 1
                : currentSongIndex - 1;
        setCurrentSongIndex(prevIndex);
        await loadAudio(cheeringSongs[prevIndex].uri);

        // 새로운 사운드 객체가 생성된 후 재생
        setTimeout(async () => {
            if (sound) {
                try {
                    await sound.playAsync();
                } catch (error) {
                    console.error("이전 곡 재생 실패:", error);
                }
            }
        }, 100);
    };

    const playSelectedSong = async (index: number): Promise<void> => {
        setCurrentSongIndex(index);
        await loadAudio(cheeringSongs[index].uri);

        setTimeout(async () => {
            if (sound) {
                try {
                    await sound.playAsync();
                } catch (error) {
                    console.error("선택 곡 재생 실패:", error);
                }
            }
        }, 100);
    };

    const formatTime = (millis: number): string => {
        const minutes = Math.floor(millis / 60000);
        const seconds = Math.floor((millis % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const seekTo = async (value: number): Promise<void> => {
        if (sound && playbackState.isLoaded) {
            try {
                await sound.setPositionAsync(value);
            } catch (error) {
                console.error("탐색 실패:", error);
            }
        }
    };

    const getProgressPercentage = (): number => {
        if (playbackState.duration > 0) {
            return (playbackState.position / playbackState.duration) * 100;
        }
        return 0;
    };

    const currentSong = cheeringSongs[currentSongIndex];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>응원가 플레이어</Text>

            {/* 현재 곡 정보 */}
            <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{currentSong.title}</Text>
                {currentSong.artist && (
                    <Text style={styles.artistName}>{currentSong.artist}</Text>
                )}
                <Text style={styles.timeInfo}>
                    {formatTime(playbackState.position)} /{" "}
                    {formatTime(playbackState.duration)}
                </Text>
            </View>

            {/* 진행률 바 */}
            <TouchableOpacity
                style={styles.progressContainer}
                onPress={(event) => {
                    const { locationX } = event.nativeEvent;
                    const progressContainerWidth = 300; // 대략적인 너비
                    const newPosition =
                        (locationX / progressContainerWidth) *
                        playbackState.duration;
                    seekTo(newPosition);
                }}
                activeOpacity={0.7}
            >
                <View style={styles.progressBackground}>
                    <View
                        style={[
                            styles.progressBar,
                            { width: `${getProgressPercentage()}%` },
                        ]}
                    />
                </View>
            </TouchableOpacity>

            {/* 컨트롤 버튼 */}
            <View style={styles.controls}>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={playPrevious}
                    activeOpacity={0.7}
                >
                    <Text style={styles.controlText}>⏮</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.playButton}
                    onPress={togglePlayPause}
                    activeOpacity={0.8}
                >
                    <Text style={styles.playText}>
                        {playbackState.isPlaying ? "⏸" : "▶"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={playNext}
                    activeOpacity={0.7}
                >
                    <Text style={styles.controlText}>⏭</Text>
                </TouchableOpacity>
            </View>

            {/* 곡 목록 */}
            <View style={styles.playlist}>
                <Text style={styles.playlistTitle}>응원가 목록</Text>
                {cheeringSongs.map((song, index) => (
                    <TouchableOpacity
                        key={song.id}
                        style={[
                            styles.playlistItem,
                            index === currentSongIndex && styles.currentTrack,
                        ]}
                        onPress={() => playSelectedSong(index)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.songItemContent}>
                            <Text style={styles.songItemTitle}>
                                {song.title}
                            </Text>
                            {song.artist && (
                                <Text style={styles.songItemArtist}>
                                    {song.artist}
                                </Text>
                            )}
                        </View>
                        {index === currentSongIndex &&
                            playbackState.isPlaying && (
                                <Text style={styles.playingIndicator}>♪</Text>
                            )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
        color: "#333",
    },
    songInfo: {
        alignItems: "center",
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    songTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 5,
        textAlign: "center",
        color: "#333",
    },
    artistName: {
        fontSize: 16,
        color: "#666",
        marginBottom: 10,
    },
    timeInfo: {
        fontSize: 14,
        color: "#888",
    },
    progressContainer: {
        marginBottom: 30,
        paddingVertical: 10,
    },
    progressBackground: {
        height: 4,
        backgroundColor: "#ddd",
        borderRadius: 2,
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#1976D2",
        borderRadius: 2,
    },
    controls: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },
    controlButton: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
    },
    controlText: {
        fontSize: 28,
        color: "#333",
    },
    playButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#1976D2",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    playText: {
        fontSize: 32,
        color: "white",
        marginLeft: 2, // 재생 버튼 아이콘 중앙 정렬 조정
    },
    playlist: {
        flex: 1,
    },
    playlistTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    playlistItem: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 3,
        borderLeftColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    currentTrack: {
        borderLeftColor: "#1976D2",
        backgroundColor: "#e3f2fd",
    },
    songItemContent: {
        flex: 1,
    },
    songItemTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        marginBottom: 2,
    },
    songItemArtist: {
        fontSize: 14,
        color: "#666",
    },
    playingIndicator: {
        fontSize: 16,
        color: "#1976D2",
        fontWeight: "bold",
    },
});

export default ExpoMusicPlayer;
