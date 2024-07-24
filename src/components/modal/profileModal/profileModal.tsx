import { Button, Center, FileInput, Modal, NumberInput, Space, TextInput, Textarea, rem } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import React, { useEffect, useState } from 'react'
import { UserInfoProps } from '../../profile/userInfo/UserInfo';
import { pb } from '@/src/utils/data';
import { IconFileCv, IconPhoto, IconTrash } from '@tabler/icons-react';

interface ProfileModalProps {
    opened: boolean;
    close: () => void;
    userInfo: UserInfoProps;
    fetchUserInfo: (userId: string) => void;
    userId: string;
    setLoading: (loading: boolean) => void;
}

const ProfileModal = ({ opened, close, userInfo, fetchUserInfo, userId, setLoading }: ProfileModalProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [isDeletingAvatar, setIsDeletingAvatar] = useState(false);
    const [isDeletingCV, setIsDeletingCV] = useState(false);

    const { setValues, resetDirty, setFieldValue, ...form } = useForm({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            job_role: "",
            location: "",
            linkedin_url: "",
            slack_id: "",
            year_exp: 0,
            description: "",
            resume: null,
            avatar: null,
        },

        validate: {
            name: (value) => {
                if (!value) return "Name is required";
                if (value.length > 100) return "Name cannot exceed 100 characters";
            },
            job_role: (value) => value.length > 150 ? "Job role cannot exceed 150 characters" : null,
            location: (value) => value.length > 60 ? "Location cannot exceed 60 characters" : null,
            description: (value) => value.length > 2600 ? "Description cannot exceed 2600 characters" : null,
            year_exp: (value) => value > 80 ? "Year of experience cannot exceed 70 years" : null
        }
    })

    useEffect(() => {
        setValues({
            name: userInfo.name,
            job_role: userInfo.job_role,
            location: userInfo.location,
            linkedin_url: userInfo.linkedin_url,
            slack_id: userInfo.slack_id,
            year_exp: userInfo.year_exp,
            description: userInfo.description,
        });

        // Field is considered to be dirty when its value was changed 
        // reset, so we only submit the values that were changed
        resetDirty()
    }, [userInfo, setValues]);

    const updateProfile = async (values: any) => {
        try {
            setIsUploading(true)
            setLoading(true);

            // Create an object to hold update data
            // expected format: { name: new_name, avatar: new_avatar, etc. }
            const dataToUpdate: Record<string, any> = {};
            const userInfoToUpdate: Record<string, any> = {};

            // Loop through each form field
            for (const field in values) {
                // Check if the field has changed using form.isDirty()
                if (form.isDirty(field)) {
                    // Determine where each field should be updated based on your data structure
                    if (["name", "avatar"].includes(field)) {
                        dataToUpdate[field] = values[field];
                    } else {
                        userInfoToUpdate[field] = values[field];
                    }
                }
            }

            // console.log("userInfoToUpdate", userInfoToUpdate)

            if (Object.keys(dataToUpdate).length > 0) {
                await pb.collection("users").update(userInfo.id, dataToUpdate);
            }

            if (Object.keys(userInfoToUpdate).length > 0) {
                if (!userInfo.user_info_id) {
                    userInfoToUpdate["user_id"] = userInfo.id;
                    // logic to create new user_info record
                    const newUserInfo = await pb.collection("user_info").create(userInfoToUpdate);
                } else {
                    const result = await pb.collection("user_info").update(userInfo.user_info_id, userInfoToUpdate);
                }
            }

            fetchUserInfo(userId);

            notifications.show({ message: "Information is updated!", color: "green" })
            close()
        } catch (error: any) {
            notifications.show({ message: "Something went wrong! Please try again later!", color: "red" })
        } finally {
            setIsUploading(false);
            setLoading(false);
        }
    }

    const deleteAvatar = async () => {
        try {
            setLoading(true);
            setIsDeletingAvatar(true);

            await pb.collection("users").update(userInfo.id, { avatar: null });
            fetchUserInfo(userId);
        } catch (error: any) {
            notifications.show({ message: "Something went wrong! Please try again later!", color: "red" })
        } finally {
            setIsDeletingAvatar(false);
            setLoading(false);
        }
    }

    const deleteCV = async () => {
        try {
            setLoading(true);
            setIsDeletingCV(true);

            if (!userInfo.user_info_id) {
                throw new Error("User info id is missing");
            } else {
                await pb.collection("user_info").update(userInfo.user_info_id, { resume: null });
            }

            fetchUserInfo(userId);
        } catch (error: any) {
            notifications.show({ message: "Something went wrong! Please try again later!", color: "red" })
        } finally {
            setIsDeletingCV(false);
            setLoading(false);
        }
    }

    return (
        <Modal opened={opened} onClose={close} title="Edit Profile" size={"lg"}>
            <form onSubmit={form.onSubmit((values) => { updateProfile(values) })}>
                {/* <Button onClick={() => { console.log(userInfo) }}>Get UserInfo</Button> */}

                {/* Modal content */}
                <TextInput
                    label="Name"
                    placeholder="John Doe"
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                />
                <Space h="lg" />

                <TextInput
                    label="Job Title"
                    placeholder="Associate Cloud Consultant"
                    key={form.key("job_role")}
                    {...form.getInputProps("job_role")}
                />
                <Space h="lg" />

                <TextInput
                    label="Your location"
                    placeholder="Enter your location"
                    key={form.key("location")}
                    {...form.getInputProps("location")}
                />
                <Space h="lg" />

                <NumberInput
                    label="Years of experience"
                    placeholder="Your experience in years"
                    allowNegative={false}
                    decimalScale={2}
                    min={0}
                    max={100}
                    key={form.key("year_exp")}
                    {...form.getInputProps("year_exp")}
                />
                <Space h="lg" />

                <FileInput
                    leftSection={<IconPhoto style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                    clearable
                    accept="image/png,image/jpeg"
                    label="Profile Picture"
                    placeholder="Attach your profile picture"
                    leftSectionPointerEvents="none"
                    error="Invalid file type, only .png and .jpeg are supported"
                    key={form.key("avatar")}
                    {...form.getInputProps("avatar")}
                />
                <Space h="xs" />
                <Button
                    variant="light" color="pink"
                    disabled={!userInfo.avatar} size="xs"
                    leftSection={<IconTrash size={14} />}
                    loading={isDeletingAvatar}
                    onClick={() => { deleteAvatar() }}
                >
                    Delete current picture
                </Button>
                <Space h="lg" />

                <FileInput
                    leftSection={<IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                    clearable
                    accept=".pdf, .doc, .docx, .ppt, .pptx"
                    label="CV / One Pager"
                    placeholder="Attach your CV / One Pager"
                    leftSectionPointerEvents="none"
                    error="Invalid file type, only .pdf, .doc, .docx, .ppt, .pptx are supported"
                    key={form.key("resume")}
                    {...form.getInputProps("resume")}
                />
                <Space h="xs" />
                <Button
                    variant="light" color="pink"
                    disabled={!userInfo.resume} size="xs"
                    leftSection={<IconTrash size={14} />}
                    loading={isDeletingCV}
                    onClick={() => { deleteCV() }}
                >
                    Delete current CV
                </Button>
                <Space h="lg" />

                <TextInput
                    label="Linkedin profile url"
                    placeholder="linkedin.com/in/john_doe"
                    key={form.key("linkedin_url")}
                    {...form.getInputProps("linkedin_url")}
                />
                <Space h="lg" />

                <TextInput
                    label="Slack"
                    placeholder="@john_doe"
                    key={form.key("slack_id")}
                    {...form.getInputProps("slack_id")}
                />
                <Space h="lg" />

                <Textarea
                    label="Profile description"
                    placeholder="Describe your experience, skills and what you are looking for"
                    resize="vertical"
                    autosize
                    minRows={4}
                    maxRows={8}
                    key={form.key("description")}
                    {...form.getInputProps("description")}
                />
                <Space h="lg" />


                <Space h="md" />
                <Center>
                    {/* <Button variant="light" onClick={close}>Save</Button> */}
                    <Button variant="light" type="submit" loading={isUploading}>Save</Button>
                </Center>
            </form>
        </Modal>
    )
}

export default ProfileModal