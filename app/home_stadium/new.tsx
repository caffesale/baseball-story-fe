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
import { Banner } from "@/shared/ui";
import { TEAM_CODE, TEAM_INFO } from "@/shared/utils/constants";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

interface StadiumFormData {
    name: string;
    selectedTeam: TEAM_CODE;
    favoriteMember: string;
}

const steps = ["홈구장 이름", "팀 선택", "최애 선수 설정"];

export default function NewStadium() {
    const [step, setStep] = React.useState<number>(0);
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<StadiumFormData>({
        defaultValues: {
            name: "",
            selectedTeam: "DOOSAN",
            favoriteMember: "",
        },
    });

    const onNext = () => {
        setStep((prev) => Math.min(prev + 1, steps.length - 1));
    };
    const onBack = () => {
        setStep((prev) => Math.max(prev - 1, 0));
    };

    const onSubmit = (data: StadiumFormData) => {
        console.log(data);
    };

    return (
        <View className="mt-4">
            <VStack space="lg">
                <Heading size="lg">홈구장 생성</Heading>
                <FormControl className="max-w-xs">
                    {step === 0 && (
                        <>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    홈구장 이름
                                </FormControlLabelText>
                            </FormControlLabel>
                            <Controller
                                control={control}
                                name="name"
                                rules={{ required: true }}
                                render={({ field: { value, onChange } }) => (
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
                        </>
                    )}
                    {step === 1 && (
                        <>
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
                                    <RadioGroup
                                        value={values}
                                        onChange={onChange}
                                    >
                                        <VStack space="md">
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
                                                            >{`${teamInfo.name}`}</RadioLabel>
                                                            <Banner
                                                                source={
                                                                    teamInfo.image
                                                                }
                                                            />
                                                        </Radio>
                                                    );
                                                }
                                            )}
                                        </VStack>
                                    </RadioGroup>
                                )}
                            />
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <FormControlLabel>
                                <FormControlLabelText>
                                    최애 선수 설정
                                </FormControlLabelText>
                            </FormControlLabel>
                            <Controller
                                control={control}
                                name="favoriteMember"
                                render={({
                                    field: { value: values, onChange },
                                }) => {
                                    return (
                                        <RadioGroup
                                            value={values}
                                            onChange={onChange}
                                        >
                                            <Radio value="이대호">
                                                <RadioLabel>이대호</RadioLabel>
                                            </Radio>
                                            <Radio value="류현진">
                                                <RadioLabel>류현진</RadioLabel>
                                            </Radio>
                                        </RadioGroup>
                                    );
                                }}
                            />
                        </>
                    )}
                </FormControl>
                <VStack space="sm">
                    {step > 0 && (
                        <Button size="md" variant="outline" onPress={onBack}>
                            <ButtonText>Back</ButtonText>
                        </Button>
                    )}
                    {step < steps.length - 1 ? (
                        <Button size="md" variant="outline" onPress={onNext}>
                            <ButtonText>Next</ButtonText>
                        </Button>
                    ) : (
                        <Button
                            size="md"
                            variant="outline"
                            onPress={handleSubmit(onSubmit)}
                        >
                            <ButtonText>Submit</ButtonText>
                        </Button>
                    )}
                </VStack>
            </VStack>
        </View>
    );
}
