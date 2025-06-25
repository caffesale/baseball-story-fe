import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import {
    FormControl,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Radio, RadioGroup, RadioLabel } from "@/components/ui/radio";
import { VStack } from "@/components/ui/vstack";
import { IPostStadium, useCreateStadium } from "@/entities";
import { Banner } from "@/shared/ui";
import { TEAM_CODE, TEAM_INFO } from "@/shared/utils/constants";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";

export default function NewStadium() {
    const { control, handleSubmit } = useForm<IPostStadium>({
        defaultValues: {
            name: "",
            selectedTeam: "DOOSAN",
        },
    });
    const createStadium = useCreateStadium();
    const router = useRouter();

    return (
        <View className="mt-4">
            <Box className="justify-center items-center">
                <VStack space="lg">
                    <Heading size="lg">홈구장 생성</Heading>
                    <FormControl className="max-w-xs">
                        <VStack space="lg">
                            <Box>
                                <FormControlLabel>
                                    <FormControlLabelText>
                                        홈구장 이름
                                    </FormControlLabelText>
                                </FormControlLabel>
                                <Controller
                                    control={control}
                                    name="name"
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <Input size="md">
                                            <InputField
                                                value={value}
                                                onChangeText={onChange}
                                            />
                                        </Input>
                                    )}
                                />
                                <FormControlHelperText>
                                    홈구장 이름은 닉네임으로 사용됩니다.
                                </FormControlHelperText>
                            </Box>
                            <Box>
                                <FormControlLabel>
                                    <FormControlLabelText>
                                        team
                                    </FormControlLabelText>
                                </FormControlLabel>
                                <Controller
                                    control={control}
                                    name="selectedTeam"
                                    rules={{ required: true }}
                                    render={({
                                        field: { value: values, onChange },
                                    }) => (
                                        <ScrollView style={{ maxHeight: 300 }}>
                                            <RadioGroup
                                                value={values}
                                                onChange={onChange}
                                            >
                                                {Object.keys(TEAM_INFO).map(
                                                    (teamCode) => {
                                                        const team =
                                                            teamCode as TEAM_CODE;
                                                        const teamInfo =
                                                            TEAM_INFO[team];
                                                        return (
                                                            <Radio
                                                                key={team}
                                                                value={team}
                                                            >
                                                                <RadioLabel
                                                                    accessibilityLabel={`${teamInfo.name}`}
                                                                    className="sr-only"
                                                                >
                                                                    {
                                                                        teamInfo.name
                                                                    }
                                                                </RadioLabel>
                                                                <Banner
                                                                    source={
                                                                        teamInfo.image
                                                                    }
                                                                    selected={
                                                                        teamCode ===
                                                                        values
                                                                    }
                                                                    className="w-full"
                                                                />
                                                            </Radio>
                                                        );
                                                    }
                                                )}
                                            </RadioGroup>
                                        </ScrollView>
                                    )}
                                />
                            </Box>
                            <Box>
                                <FormControlLabel>
                                    <FormControlLabelText>
                                        최애선수 선택
                                    </FormControlLabelText>
                                </FormControlLabel>
                                {/* <Controller
                                    control={control}
                                    name="favoritePlayer"
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <Select>
                                            <SelectTrigger>
                                                <SelectInput />
                                                <SelectIcon as={ChevronDown} />
                                            </SelectTrigger>
                                            <SelectPortal>
                                                <SelectBackdrop />
                                                <SelectContent>
                                                    <SelectDragIndicatorWrapper>
                                                        <SelectDragIndicator />
                                                    </SelectDragIndicatorWrapper>
                                                    <SelectItem
                                                        label="이대호"
                                                        value="이대호"
                                                    />
                                                </SelectContent>
                                            </SelectPortal>
                                        </Select>
                                    )}
                                /> */}
                            </Box>
                            <Box>
                                <Button
                                    size="md"
                                    variant="outline"
                                    className=""
                                    onPress={handleSubmit((data) => {
                                        console.log("ok");

                                        router.replace("../home_stadium/1");
                                        // createStadium.mutate({
                                        //     ...data,
                                        //     ownerId: 1,
                                        // });
                                    })}
                                >
                                    <ButtonText>Submit</ButtonText>
                                </Button>
                            </Box>
                        </VStack>
                    </FormControl>
                </VStack>
            </Box>
        </View>
    );
}
